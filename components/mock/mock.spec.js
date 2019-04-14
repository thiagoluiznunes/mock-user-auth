process.env.NODE_ENV = 'test';

import chai from 'chai';
import chaiHttp from 'chai-http';
import mock from './mock';
import server from '../../bin/www';

const assert = chai.assert;
const expect = chai.expect;

const user = {
  name: 'User test',
  email: 'user@test.com',
  password: 'user123'
}

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

describe('Mock Api' , () => {
  describe('/POST User', () => {
    it('It should create a new user', async () => {
      chai.request(server)
      .post('/api/v1/users')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.be.oneOf([200, 401]);
        expect(res.body).to.be.an('Object')
        expect(res.body.message).to.be.oneOf([
          'User registered with success',
          'User already registered'
        ]);
      });
    });
  });

  describe('/Auth User', () => {
    it('It should authenticate user', async () => {
      chai.request(server)
      .post('/api/v1/auth')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('Object');
        expect(res.body.token).to.be.not.empty;
      })
    });
  });
});
