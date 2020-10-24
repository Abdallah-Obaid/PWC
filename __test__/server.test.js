'use strict';

const supergoose = require('@code-fellows/supergoose');
const { server } = require('../src/server');
const mockRequest = supergoose(server);

describe('Server API', ()=> {

  it('should respond 404 of an invalid route',() => {
    return mockRequest
      .get('/invalidroute')
      .then(results => {
        expect(results.status).toBe(404);
      }).catch(console.log);
  });

  it('should respond with 500', ()=> {   
    return mockRequest.get('/bad')
      .then(results=> {
        expect(results.status).toBe(500);
      }).catch(console.error);
  });
    
  it('should respond properly /admincheckuser', ()=> {
    return mockRequest
      .get('/admincheckuser')
      .then(results => {
        expect(results.status).toBe(500);
      });
  });

  it('should respond properly /signup', ()=> {
    return mockRequest
      .post('/signup')
      .send({
        
        'username': 'quran',
        'password': '123',
        'email':'raghadalquran1@gmail.com',
        'image':'llllllllllllll',
        'role':'user',
        
      })
      .then(results => {
        expect(results.status).toBe(200);
      });
  });

  it('should respond properly /signin', ()=> {
    return mockRequest
      .post('/signup')
      .send({
        'username': 'quran',
        'password': '123',
        'email':'raghadalquran1@gmail.com',
        'image':'llllllllllllll',
        'role':'user',
      })
      .then(results => {
        return mockRequest
          .post('/accept')
          .set({
            '_id':'5ef1c1019c620005cbce1fea',
            'username': 'quran',
            'password': '123',
            'email':'raghadalquran1@gmail.com',
            'image':'llllllllllllll',
            'role':'user',
            'position':'developer',
          })
          .then(results => {
            return mockRequest
              .post('/signin')
              .set('Authorization', 'Basic cXVyYW46MTIz')
              .then(data => {
                expect(data.status).toBe(500);
              });
          });
      });
  });

  it('TEST post() not found ', ()=> {
    return mockRequest
      .post('/notFound')
      .then(data => {
        expect(data.status).toBe(404);
      });
  });
});