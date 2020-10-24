'use strict';
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET; // place this in your .env
const mongoDB = require('./models/users/users-model');
const adminMongoDB = require('./models/admin/admin-model');

let users = {}; //exporting
let roles = {
  user: ['read'],
  writers: ['read', 'create'],
  accountant: ['read', 'account'],
  admin: ['read', 'manage', 'update', 'account', 'create', 'delete'],
};

/**
 * @param {obj}
 */
users.save = async function (record) {
  let reading = await mongoDB.read(record.username);
  let emailCheck = await mongoDB.read(record.email);
  if (!(reading[0] || emailCheck[0])) {
    record.password = await bcrypt.hash(record.password, 5);
    await mongoDB.create(record);
    return record;
  }
  return Promise.reject();
};

users.saveDirect = async function (record) {
  let reading = await adminMongoDB.read(record.username);
  let emailCheck = await adminMongoDB.read(record.email);
  if (!(reading[0] || emailCheck[0])) {
    record.password = await bcrypt.hash(record.password, 5);
    await adminMongoDB.create(record);
    return record;
  }
  return Promise.reject();
};

/**
 * @param {obj} record 
 */
users.saveAdmin = async function (record) {
  let reading = await adminMongoDB.read(record.username);
  if (!reading[0]) {
    record.workHours = 0;
    await adminMongoDB.create(record);
    return record;
  }
  return Promise.reject();
};





/**
 * @param(string)
 */
// compare the password with the encrypted one
users.authenticateBasic = async function (username, password) {
  let reading = await adminMongoDB.read(username);
  let valid = await bcrypt.compare(password, reading[0].password);
  return valid ? username : Promise.reject();
};

/**
 * @param {obj} user 
 */
users.generateTokenUp = function (user) {
  // ,{expiresIn:900}
  let token = jwt.sign({ username: user.username, capabilities: roles[user.role] }, SECRET, { expiresIn: 9999999 });
  return token;
};

/**
  * 
 * @param {obj} user 
 */
users.generateTokenIn = async function (user) {
  let reading = await adminMongoDB.read(user);
  // ,{expiresIn:900}
  let capabilities = roles[reading[0].role] || user.role;
  let token = await jwt.sign({ id: reading[0]._id, capabilities: capabilities }, SECRET, { expiresIn: 999999999 });
  return token;
};

/**
 * 
 * @param {obj} record 
 */
users.getUserProfile = async function (record) {
  let reading = await adminMongoDB.readId(record);
  return reading[0];
};

/**
 * 
 * @param {obj} record 
 */
users.list = async function (record) {
  let reading = await mongoDB.read(record);
  return reading;
};

/**
 * 
 * @param {string} id 
 * @param {obj} record 
 */
users.updateUserProfile = async function (id, record) {
  let reading = await adminMongoDB.PATCH(id, record);
  return reading[0];
};

/**
 * 
 * @param {string} token 
 */
users.verifyToken = function (token) {
  return jwt.verify(token, SECRET, async function (err, decoded) {
    if (err) {
      return Promise.reject(err);
    }
    console.log('decoded >>>> ', decoded); // {username: usernameValue, ...}
    console.log('decoded >>>> ', decoded.id); // {username: usernameValue, ...}
    let id = decoded.id; // decoded.id
    let reading = await adminMongoDB.readId(id);
    if (reading[0]) {
      return Promise.resolve(decoded);
    }
    return Promise.reject();
  });
};


module.exports = users;


