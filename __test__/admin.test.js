'use strict';
require('@code-fellows/supergoose');

const admin = require('../src/auth/models/admin/admin-model');
let testObj2 = {
  'username':'raghadqu',
  'password' : 'OjEyMw==',
  'email' :'raghadalquran1@gmail.com',
  'image': 'hgfhkjk',
  'role':'admin',
  'position':'admin',
};

describe('admin Model', () =>{
  it('can create()', ()=> {
    return admin.create(testObj2)
      .then(record => {
        Object.keys(testObj2).forEach(key=> {
          expect(record[key]).toEqual(testObj2[key]);
        });
      });
  });

  it('can read()', ()=> {
    return admin.read()
      .then(results => {
        Object.keys(testObj2).forEach(key=> {
          expect(results[0][key]).toEqual(testObj2[key]);
        });
      });
  });

  it('can update()', ()=> {
    return admin.update()
      .then(results => {
        expect(results).toBeNull();
      });
  });
  
  it('can delete()', ()=> {
    return admin.delete()
      .then(results => {
        expect(results).toBeNull();

      });
  });
});