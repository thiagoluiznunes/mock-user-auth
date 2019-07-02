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

const userPost = (bool) => {
  mock.controller.postUser('controller', 'controller@test.com', 'controller123', 'https://')
    .then(res => {
      expect(res.status).to.be.an('boolean');
      expect(res.status).to.equal(bool);
    });
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
  describe('Delete All Users Function', () => {
    it('It should delete all users', () => {
      mock.controller.deleteAllUsers()
        .then(res => {
          expect(res).to.equal(true);
        });
    });
  });
  describe('PostUser Function', () => {
    it('It should insert a new user', () => {
      userPost(true);
    });
    it('It should block the insertion of existent user', () => {
      userPost(false);
    });
  });
});

chai.use(chaiHttp);

const deleteAllUsersRequest = (key, code) => {
  chai.request(server)
    .delete('/api/v1/all-users')
    .send({ key_admin: key })
    .end((err, res) => {
      expect(res.status).to.equal(code);
    });
}

const userPostRequest = (code, message) => {
  chai.request(server)
    .post('/api/v1/users')
    .send(user)
    .end((err, res) => {
      expect(res.status).to.equal(code);
      expect(res.body).to.be.an('Object');
      expect(res.body.message).to.be.equal(message);
    });
}

const userAuthRequest = (code, data) => {
  chai.request(server)
    .post('/api/v1/auth')
    .send(data)
    .end((err, res) => {
      expect(res.status).to.equal(code);
      expect(res.body).to.be.an('Object');
    });
}

const userGetRequest = (code, data) => {
  chai.request(server)
    .get('/api/v1/users')
    .set('Authorization', data)
    .end((err, res) => {
      expect(res.body).to.be.an('Object');
      expect(res.body).to.be.not.empty;
      expect(res.status).to.equal(code);
    });
}

const userDeleteRequest = (code, token) => {
  chai.request(server)
    .delete('/api/v1/users')
    .set('Authorization', token)
    .end((err, res) => {
      expect(res.status).to.equal(code);
    });
}

const userPatchRequest = (code, token, body) => {
  chai.request(server)
    .patch('/api/v1/users')
    .set('Authorization', token, body)
    .end((err, res) => {
      expect(res.status).to.equal(code);
      expect(res.body).to.be.an('Object');
      expect(res.body).to.be.not.empty;
    });
}

const retriveUserToken = async () => {
  let token;
  await userPostRequest(200, 'User registered with success');
  await chai.request(server)
    .post('/api/v1/auth')
    .send(user)
    .then((res) => {
      token = res.body.token;
    })
    .catch((err) => {
      throw err;
    });
  return token;
}

describe('Mock Api', () => {
  describe('/DELETE Users 200', () => {
    it('It should delete all users', () => {
      deleteAllUsersRequest('keyadmin123', 200);
    });
  });
  describe('/DELETE Users 403', () => {
    it('It should not delete all users', () => {
      deleteAllUsersRequest('wrongpassword', 403);
    });
  });

  describe('/POST User 200', () => {
    it('It should create a new user', () => {
      userPostRequest(200, 'User registered with success');
    });
  });
  describe('/POST User 401', () => {
    it('It should not create a new user', () => {
      userPostRequest(401, 'User already registered');
    });
  });
  describe('/Auth User 200', () => {
    after(() => {
      deleteAllUsersRequest('keyadmin123', 200);

    });
    it('It should authenticate user', () => {
      userAuthRequest(200, user);
    });
  });
  describe('/Auth User 401', () => {
    it(`It shouldn't authenticate user`, () => {
      userAuthRequest(401, { name: 'user', email: 'user@test.com', password: 'wrongpassword' });
    });
  });
  describe('/GET User 200', () => {
    let token;
    before(async () => {
      token = await retriveUserToken();
    });
    after(() => {
      deleteAllUsersRequest('keyadmin123', 200);
    });
    it('It should get a user by token', () => {
      userGetRequest(200, token);
    });
  });
  describe('/GET User 403', () => {
    it('It should not get a user by token', () => {
      userGetRequest(403, 'wrongtoken');
    });
  });

  describe('/PATCH User 200', () => {
    after(() => {
      deleteAllUsersRequest('keyadmin123', 200);
    });
    it('It should update a user by token', async () => {
      const token = await retriveUserToken();
      userPatchRequest(200, token, { name: 'newTestName' });
    });
  });
  describe('/GET User 403', () => {
    it('It should not update a user by token', () => {
      userPatchRequest(403, 'wrongtoken', { name: 'newTestName' });
    });
  });

  describe('/DELETE User 200', () => {
    after(() => {
      deleteAllUsersRequest('keyadmin123', 200);
    });
    it('It should update a user by token', async () => {
      const token = await retriveUserToken();
      userDeleteRequest(200, token);
    });
  });
  describe('/DELETE User 403', () => {
    it('It should not update a user by token', () => {
      userDeleteRequest(403, 'wrongtoken');
    });
  });
});
