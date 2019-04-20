import fs from 'fs';
import faker from 'faker';
import jwt from 'jsonwebtoken';

const SECRET_KEY = '123456789';
const expiresIn = '24h';
const userdb = JSON.parse(fs.readFileSync(__dirname + '/users.json', 'UTF-8'));

function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

async function deleteUsers() {
  userdb.users = [];
  await fs.writeFileSync(__dirname + '/users.json', JSON.stringify(userdb, null, 2), 'utf8');
  return true;
}

async function isAuthenticated(email, password) {
  let id = undefined;
  let res = false;
  await userdb.users.findIndex(user => {
    if (user.email === email && user.password === password) {
      id = user.id;
      res = true;
    }
  });
  return { data: id, status: res};
}

async function postUser(name, email, password, imageUrl) {
  let exist = false;
  await userdb.users.findIndex(user => {
    if (user.email === email) {
      exist = true;
    }
  });

  if (!exist) {
    const id = await faker.random.number();
    await userdb.users.push({
      id: id,
      name: name,
      email: email,
      password: password,
      imageUrl: imageUrl
    });
    fs.writeFileSync(__dirname + '/users.json', JSON.stringify(userdb, null, 2), 'utf8');
    return { data: id, status: true };
  } else {
    return { data: undefined, status: false }
  }
}

async function getUser(token) {
  let data, res_decode, status;
  await jwt.verify(token, SECRET_KEY, (err, decode) => {
    if (err) {
      data = err.message;
      status = false;
    } else {
      res_decode = decode;
      status = true;
    }
  });
  if (status) {
    await userdb.users.findIndex(user => {
      if (user.email === res_decode.email && user.id === res_decode.id) {
        data = user;
        status = true;
      }
    });
  }
  return { data: data, status: status };
}

export default {
  createToken,
  isAuthenticated,
  postUser,
  getUser,
  deleteUsers
}
