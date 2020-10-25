'use strict';

require('@code-fellows/supergoose');


const adminModel = require('../src/auth/models/admin/admin-model');
const users = require('../src/auth/models/users/users-model');

let obj = { '_id':'5ef1c1019c620005cbce1fea',
  'username': 'quran',
  'password': '123',
  'email':'raghadalquran1@gmail.com',
  'image':'llllllllllllll',
  'role':'user',
  'position':'developer'};

describe('user Model', () =>{
  it('deleteUserHandler', ()=> {
    adminModel.delete(obj._id)
      .then(data => {
        expect(data.status).toBe(200);
      });
  });

  it('updateUserHandler', ()=> {
    adminModel.update(obj)
      .then(data => {
        expect(data.status).toBe(200);
      });
  });

  it('addUserHandler', ()=> {
    users.create(obj)
      .then(data => {
        expect(data.status).toBe(200);
      });
  });

  it('list', ()=> {
    users.read(undefined)
      .then(data => {
        expect(data.status).toBe(200);
      });
  });
  it('updateUserProfile', ()=> {
    users.update(obj._id,obj)
      .then(data => {
        expect(data.status).toBe(200);
      });
  });

});
