'use strict';

require('@code-fellows/supergoose');

const user  = require('../src/auth/models/users/users-model');

let testObj = {
  'username': 'quran',
  'password': '123',
  'email':'raghadalquran1@gmail.com',
  'image':'llllllllllllll',
  'role':'user',
};

describe('user Model', () =>{
  it('can create() a user', ()=> {
    return user.create(testObj)
      .then(record => {
        Object.keys(testObj).forEach(key=> {
          expect(record[key]).toEqual(testObj[key]);
        });
      });
  });

  it('can read() user', ()=> {
    return user.read()
      .then(results => {
        Object.keys(testObj).forEach(key=> {
          expect(results[0][key]).toEqual(testObj[key]);
        });
      });
  });

  it('can update() user', ()=> {
    return user.update()
      .then(results => {
        expect(results).toBeNull();
      });
  });
  
  it('can delete() user', ()=> {
    return user.delete()
      .then(results => {
        expect(results).toBeNull();
      });
  });
});