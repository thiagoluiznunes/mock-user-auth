process.env.NODE_ENV = 'test';

import chai from 'chai';
import chaiHttp from 'chai-http';
import mock from './mock';
import { server } from '../../bin/www';

const assert = chai.assert;
const expect = chai.expect;

const user = {
  name: 'user',
  email: 'user@test.com',
  password: 'user123'
}

describe('Mock Module', () => {
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

describe('Mock Controller', () => {
  describe('IsAuthenticated Function', () => {
    it('It should check the function return ', () => {
      mock.controller.isAuthenticated(user.email, user.password)
        .then(res => {
          expect(res.status).to.be.an('boolean');
        });
    });
  });
  describe('DeleteUsers Function', () => {
    it('It should delete all users', () => {
      mock.controller.deleteUsers()
        .then(res => {
          expect(res).to.equal(true);
        });
    });
  });
  describe('PostUser Function', () => {
    it('It should insert a new user', () => {
      mock.controller.postUser('controller', 'controller@test.com', 'controller123', 'https://')
        .then(res => {
          expect(res.status).to.be.an('boolean');
          expect(res.status).to.equal(true);
        });
    });
    it('It should block the insertion of existent user', () => {
      mock.controller.postUser('controller', 'controller@test.com', 'controller123', 'https://')
        .then(res => {
          expect(res.status).to.be.an('boolean');
          expect(res.status).to.equal(false);
        });
    });
  });
});

chai.use(chaiHttp);

describe('Mock Api', () => {
  describe('/DELETE Users 200', () => {
    it('It should delete all users', () => {
      chai.request(server)
        .delete('/api/v1/users')
        .send({ key_admin: '123456' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
        });
    });
  });
  describe('/DELETE Users 403', () => {
    it('It should delete all users', () => {
      chai.request(server)
        .delete('/api/v1/users')
        .send({ key_admin: 'wrongpassword' })
        .end((err, res) => {
          expect(res.status).to.equal(403);
        });
    });
  });
  describe('/POST User 200', () => {
    it('It should create a new user', () => {
      chai.request(server)
        .post('/api/v1/users')
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('Object');
          expect(res.body.message).to.be.equal('User registered with success');
        });
    });
  });
  describe('/POST User 401', () => {
    it('It should create a new user', () => {
      chai.request(server)
        .post('/api/v1/users')
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.be.an('Object');
          expect(res.body.message).to.be.equal('User already registered');
        });
    });
  });
  describe('/Auth User 200', () => {
    after(() => {
      chai.request(server)
        .delete('/api/v1/users')
        .send({ key_admin: '123456' })
        .end((err, res) => { });
    });
    it('It should authenticate user', () => {
      chai.request(server)
        .post('/api/v1/auth')
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('Object');
          expect(res.body.token).to.be.not.empty;
        });
    });
  });
  describe('/Auth User 401', () => {
    it(`It shouldn't authenticate user`, () => {
      chai.request(server)
        .post('/api/v1/auth')
        .send({ name: 'user', email: 'user@test.com', password: 'wrongpassword' })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.be.an('Object');
        });
    });
  });
  describe('/GET User 200', () => {
    let token;
    before(() => {
      chai.request(server)
        .post('/api/v1/users')
        .send(user)
        .end((err, res) => { });
      chai.request(server)
        .post('/api/v1/auth')
        .send(user)
        .end((err, res) => {
          token = res.body.token;
        });
    });
    after(() => {
      chai.request(server)
        .delete('/api/v1/users')
        .send({ key_admin: '123456' })
        .end((err, res) => { });
    });
    it('It should get a user by token', () => {
      chai.request(server)
        .get('/api/v1/users')
        .set('Authorization', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('Object');
          expect(res.body).to.be.not.empty;
        });
    });
  });
  describe('/GET User 403', () => {
    it('It should get a user by token', () => {
      chai.request(server)
        .get('/api/v1/users')
        .set('Authorization', 'wrongtoken')
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body).to.be.an('Object');
          expect(res.body).to.be.not.empty;
        });
    });
  });
});
