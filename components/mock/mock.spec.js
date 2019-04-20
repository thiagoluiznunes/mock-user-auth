process.env.NODE_ENV = 'test';

import chai from 'chai';
import chaiHttp from 'chai-http';
import mock from './mock';
import server from '../../bin/www';

const assert = chai.assert;
const expect = chai.expect;

const user = {
  name: 'user',
  email: 'user@test.com',
  password: 'user123'
}
let token = null;

describe('Mock Module' , () => {
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

describe('Mock Controller', async () => {
  describe('IsAuthenticated Function', () => {
    it('It should check the function return ', async () => {
      mock.controller.isAuthenticated(user.email, user.password)
        .then(res => {
          expect(res.status).to.be.an('boolean');
        });
    });
  });
  describe('DeleteUsers Function', () => {
    it('It should delete all users', async () => {
      mock.controller.deleteUsers()
        .then(res => {
          expect(res).to.equal(true);
        });
    });
  });
  describe('PostUser Function', () => {
    it('It should insert a new user', async () => {
      mock.controller.postUser('controller','controller@test.com','controller123','https://')
        .then(res => {
          expect(res.status).to.be.an('boolean');
          expect(res.status).to.equal(true);
        });
      });
      it('It should block the insertion of existent user', async () => {
        mock.controller.postUser('controller','controller@test.com','controller123','https://')
        .then(res => {
          expect(res.status).to.be.an('boolean');
          expect(res.status).to.equal(false);
        });
    });
  });
});

chai.use(chaiHttp);

describe('Mock Api' , () => {
  describe('/DELETE Users', () => {
    it('It should delete all users', async () => {
      chai.request(server)
      .delete('/api/v1/users')
      .send({ key_admin: '123456' })
      .end((err, res) => {
        expect(res.status).to.equal(200);
      });
    });
  });
  describe('/POST User', () => {
    it('It should create a new user', async () => {
      chai.request(server)
      .post('/api/v1/users')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.be.oneOf([200, 401]);
        expect(res.body).to.be.an('Object');
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
        token = res.body.token;
      });
    });
  });
  describe('/GET User', () => {
    it('It should get a user by token', async () => {
      chai.request(server)
      .get('/api/v1/users')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('Object');
        expect(res.body.data).to.be.not.empty;
      });
    });
  });
});
