import fs from 'fs';
import faker from 'faker';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'authsecret123';
const expiresIn = '24h';
const userdb = JSON.parse(fs.readFileSync(__dirname + '/users.json', 'UTF-8'));

const createToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

const verifyToken = async (token) => {
  let data, status, res_decode;
  await jwt.verify(token, SECRET_KEY, (err, decode) => {
    if (err) {
      data = err.message;
      status = false;
    }
    else {
      res_decode = decode;
    }
  });
  return { data, status, res_decode };
}

const deleteAllUsers = async () => {
  userdb.users = [];
  await fs.writeFileSync(__dirname + '/users.json', JSON.stringify(userdb, null, 2), 'utf8');
  return true;
}

const isAuthenticated = async (email, password) => {
  let id = undefined;
  let res = false;
  await userdb.users.findIndex(user => {
    if (user.email === email && user.password === password) {
      id = user.id;
      res = true;
    }
  });
  return { data: id, status: res };
}

const postUser = async (name, email, password, imageUrl) => {
  let exist = false;
  await userdb.users.findIndex(user => {
    if (user.email === email) {
      exist = true;
    }
  });

  if (!exist) {
    const id = await faker.random.number();
    const newUser = {
      id: id,
      name: name,
      email: email,
      password: password,
      imageUrl: imageUrl
    }
    await userdb.users.push(newUser);
    fs.writeFileSync(__dirname + '/users.json', JSON.stringify(userdb, null, 2), 'utf8');
    const token = await createToken(newUser);
    return { data: token, status: true };
  } else {
    return { data: undefined, status: false }
  }
}

const getUser = async (token) => {
  let { data, res_decode, status } = await verifyToken(token);
  if (res_decode) {
    await userdb.users.findIndex(user => {
      if (user.email === res_decode.email && user.id === res_decode.id) {
        data = user;
        status = true;
      }
    });
  }
  return { data: data, status: status };
}

const updateUser = async (token, body) => {
  let { data, res_decode, status } = await verifyToken(token);
  if (res_decode) {
    await userdb.users.findIndex(user => {
      if (user.email === res_decode.email && user.id === res_decode.id) {
        user.name = body.name ? body.name : user.name;
        user.email = body.email ? body.email : user.email;
        user.password = body.password ? body.password : user.password;
        user.imageUrl = body.imageUrl ? body.imageUrl : user.imageUrl;
        data = user;
        status = true;
      }
    });
    fs.writeFileSync(__dirname + '/users.json', JSON.stringify(userdb, null, 2), 'utf8');
  }
  return { data: data, status: status };
}

const deleteUser = async (token) => {
  let { res_decode, status } = await verifyToken(token);
  if (res_decode) {
    await userdb.users.findIndex((user, index) => {
      if (user.email === res_decode.email && user.id === res_decode.id) {
        userdb.users.splice(index, 1);
        status = true;
      }
    });
    fs.writeFileSync(__dirname + '/users.json', JSON.stringify(userdb, null, 2), 'utf8');
  }
  return { status: status };
}

export default {
  createToken,
  isAuthenticated,
  postUser,
  getUser,
  updateUser,
  deleteUser,
  deleteAllUsers,
}
