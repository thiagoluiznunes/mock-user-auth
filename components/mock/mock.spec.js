process.env.NODE_ENV = 'test';

import chai from 'chai';
import chaiHttp from 'chai-http';
import request from 'request';
import mock from './mock';

const assert = chai.assert;
const should = chai.should;

describe('Module mock' , () => {
  it('It should be a module', () => {
    assert.typeOf(mock, 'Object');
  });

  it('It should be a express router function ', () => {
    assert.typeOf(mock.api, 'function');
  });

  it('It should be a object ', () => {
    assert.typeOf(mock.controller, 'Object');
  });
});

chai.use(chaiHttp);
const url = 'http://localhost:3000/api/v1'

describe('Mock Api' , () => {
  describe('/POST User', () => {
    it('It should create a new user', () => {
      let user = {
        name: 'User test',
        email: 'user@test.com',
        passowrd: 'user123',
        imageUrl: 'https://'
      }
      request.post({
          headers: {'content-type' : 'application/json'},
          url: `${url}/users`,
          body: JSON.stringify(user)
        }, (err, res, body) => {
          console.log(body);
        });
    });
  });
});
