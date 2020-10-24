'use strict';


const express = require('express');
const router = express.Router();
const users = require('./users');
const basicAuth = require('./middleware/basic-auth-middleware');
const oath = require('./middleware/oauth-middleware');
const bearerAuthMiddleware = require('./middleware/bearer-auth-middleware');
const permissions = require('./middleware/authorize');
const sgMail = require('@sendgrid/mail');
const userModel = require('./models/users/users-model');
const superagent = require('superagent');
const adminModel = require('./models/admin/admin-model');
let tempPass;

/** Signup-Signin Routes */

router.post('/signup', signup);
router.post('/signin', basicAuth, signin);
router.get('/oauth', oath, (req, res) => {
  tempPass = req.tempUserPassword;
  res.status(200).send('successfully signed up');
});

/**                                        Admin Routes                                              */
router.get('/adminpermanent', bearerAuthMiddleware, permissions('manage'), listall);
router.get('/admincheckuser', bearerAuthMiddleware, permissions('manage'), list);
router.post('/accept', bearerAuthMiddleware, permissions('create'), acceptUser);
router.delete('/reject/:id', bearerAuthMiddleware, permissions('manage'), rejectUser);
router.delete('/deleteuser/:id', bearerAuthMiddleware, permissions('manage'), deleteUserHandler);
router.patch('/adminedit/:id', bearerAuthMiddleware, permissions('update'), updateUserHandler);
router.post('/adduser', bearerAuthMiddleware, permissions('create'), addUserHandler);
// router.get('/allnotseencomplaints',bearerAuthMiddleware, permissions('update'), updatecomplaintstatusHandler);


/**                                         User Routes                                              */

router.get('/getuserprofile', bearerAuthMiddleware, permissions('read'), userProfileHandler);
router.post('/uservacation', bearerAuthMiddleware, permissions('read'), uservacation);
router.post('/addcomplaint', bearerAuthMiddleware, permissions('create'), addcomplaintHandler);
// router.get('/usercomplaints',bearerAuthMiddleware, permissions('read'), usercomplaintsHandler);

/**                                                                                                    */



/**
 * 
 * @param {obj} req 
 * @param {obj} res 
 * @param {function} next 
 */
function signup(req, res, next) {
  //sign up route if we have the user, return failure, else return generated token.
  console.log("@@@@@@@@@@@@@@@@@@@")
  let user = req.body;
  console.log(user, "result")
  users.save(user).then(result => {
    console.log(result, "result")
    // generate a token and return it.
    let token = users.generateTokenUp(result);
    res.cookie(token);
    res.status(200).send({ token: token });
  }).catch(err => {
    console.log('ERR!!');
    res.status(403).send('Invalid Signup! username/email is taken');
  });
}

/**
 * @param {obj} req 
 * @param {obj} res 
 * @param {function} next 
 */
// check this username if the password submitted matches the encrypted one we have saved in our db
function signin(req, res, next) {
  res.cookie(req.token);
  res.status(200).send({ token: req.token }); // return token 4
}

/**                                         Admin Routes Definitions                            */

/**
 * @param {obj} req 
 * @param {obj} res 
 * @param {function} next 
 */
function list(req, res, next) {
  users.list(undefined).then(result => {
    res.status(200).send(result);
  }).catch(err => {
    console.log('ERR!!');
    res.status(403).send('Listing error');
  });
}
/**
 * 
 * @param {obj} req 
 * @param {obj} res 
 */
async function deleteUserHandler(req, res) {
  let userId = req.params.id;
  try {
    let deleted = await adminModel.delete(userId);
    if (deleted) {
      res.status(200).send('Deleted');
    } else {
      res.status(200).send('User is Already Deleted');
    }
  } catch (error) {
    res.status(500).send('Please enter a valid user ID');
  }
}
/**
 * 
 * @param {obj} req 
 * @param {obj} res 
 */
async function updateUserHandler(req, res) {
  let userId = req.params.id;
  let updatedUser = req.body;
  try {
    await adminModel.update(userId, updatedUser);
    res.status(200).send('Updated');
  } catch (error) {
    console.log('router.js UPDATE=====>', error);
    res.status(500).send('something went wrong');
  }
}
/**
 * 
 * @param {obj} req 
 * @param {obj} res 
 */
async function addUserHandler(req, res) {
  let newUser = req.body;
  try {
    sgMail.setApiKey('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');
    const msg = {
      to: `${newUser.email}`,
      from: 'abdallahobaid23@gmail.com',
      subject: 'From PWC',
      text: 'Welcome to PWC (:',
      html: `<strong> Welcome to our site your user name is:${newUser.username} and  your password is:${newUser.password} (:</strong>`,
    };
    await sgMail.send(msg);
    await users.saveDirect(newUser);
    res.status(200).send('Created');
  } catch (error) {
    console.log('router.js CREATE=====>', error);
    res.status(500).send('This User is already created');
  }
}
async function addcomplaintHandler(req, res) {
  let newComplaint = req.body;
  try {
    sgMail.setApiKey('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');
    const msg = {
      to: `${newUser.email}`,
      from: 'abdallahobaid23@gmail.com',
      subject: 'From PWC',
      text: 'Welcome to PWC (:',
      html: `<strong> Welcome to our site your user name is:${newUser.username} and  your password is:${newUser.password} (:</strong>`,
    };
    await sgMail.send(msg);
    await users.saveDirect(newUser);
    res.status(200).send('Created');
  } catch (error) {
    console.log('router.js CREATE=====>', error);
    res.status(500).send('This User is already created');
  }
}


/**
 * 
 * @param {obj} req 
 * @param {obj} res 
 * @param {function} next 
 */
async function rejectUser(req, res, next) {
  let userId = req.params.id;
  try {
    let deleted = await userModel.delete(userId);
    if (deleted) {
      sgMail.setApiKey('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');
      const msg = {
        to: `${deleted.email}`,
        from: 'abdallahobaid@gmail23.com',
        subject: 'From E.M.S',
        text: 'Access deneid (:',
        html: `<strong>  Sorry your account with username:${deleted.username} had been rejected from E.M.S site by the admin </strong>`,
      };
      await sgMail.send(msg);
      res.status(200).json('User rejected by the admin');
      console.log('User rejected by the admin');
    } else {
      res.status(200).send('User is Already rejected');
    }
  } catch (error) {
    res.status(500).send('Please enter a valid user ID');
  }
}

/** 
 * @param {obj} req 
 * @param {obj} res 
 * @param {function} next 
 */
function acceptUser(req, res, next) {
  let userData = req.body;
  users.saveAdmin(userData).then(async result => {
    userModel.delete(userData._id);
    sgMail.setApiKey('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');
    const msg = {
      to: `${userData.email}`,
      from: 'abdallahobaid23@gmail.com',
      subject: 'Welcome to E.M.S Family',
      text: ' Welcome to E.M.S site (:',
      html: `<strong>  Welcome to E.M.S site your user name is:${userData.username} and  your password is:${tempPass || 'Secret'} (:</strong>`,
    };
    try {
      await sgMail.send(msg);
    } catch (error) {
      res.status(500).send(error);
    }
    res.status(200).json('user added to the admin schema');
    console.log('user added to the admin schema');
  }).catch(err => {
    console.log(err);
    res.status(403).send('Invalid Signup! email is taken');
  });
}

/**                               Accountant Routes Definitions                               */



/**                              User Routes Definitions                              */


/**
 * 
 * @param {obj} req 
 * @param {obj} res 
 * @param {function} next 
 * 
 */
async function uservacation(req, res, next) {
  let vacationMsg = req.body;
  let userId = req.user.id;
  let username = await adminModel.readId(userId);
  sgMail.setApiKey('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');
  const msg = {
    to: 'PWC.hr401@gmail.com',
    from: `abdallahobaid23@gmail.com`,
    subject: `Vacation request from ${username[0].username}`,
    text: 'Request has been sent (:',
    html: `<strong> ${vacationMsg.message}(:</strong>`,
  };
  try {
    await sgMail.send(msg);
  } catch (error) {
    res.send(error);
  }
  res.status(200).json('Vacation request message sent');
  console.log('Message sent');
}
/**
 * 
 * @param {obj} req 
 * @param {obj} res 
 * @param {function} next 
 */
function userProfileHandler(req, res, next) {
  let userId = req.user.id;
  users.getUserProfile(userId).then(result => {
    console.log(result);
    res.status(200).send(result);
  }).catch(err => {
    console.log('ERR!!');
    res.status(403).send('Listing error');
  });
}

/**
 * @param {obj} req 
 * @param {obj} res 
 * @param {function} next 
 */
function listall(req, res, next) {
  users.listall(undefined).then(result => {
    res.status(200).send(result);
  }).catch(err => {
    console.log('ERR!!');
    res.status(403).send('Listing error');
  });
}

module.exports = router;

