import express from 'express';
import ctrl from './mock.controller';
import helper from './mock.helper';
const router = express.Router();

const resHandler = (res, code, message) => {
  res.status(code).json({ message: message });
}

// const responseFactory = async (req, res, message) => {
//   const token = await helper.retrieveRequestToken(req);
//   const response = await ctrl.deleteUser(token, req.body);
//   if (!response.status) return resHandler(res, 403, message.error);
//   res.status(200).json({ message: message.error });
// }

router.post('/auth', helper.asyncMiddleware(async (req, res) => {
  const { email, password } = req.body;
  const response = await ctrl.isAuthenticated(email, password);

  if (!response.status || response.data === null) return resHandler(res, 401, 'Incorrect email or password');
  const id = response.data;
  const access_token = ctrl.createToken({ email, id });
  res.status(200).json({ token: access_token });
}));

router.post('/users', helper.asyncMiddleware(async (req, res) => {
  const { name, email, password } = req.body;
  const imageUrl = 'https://almsaeedstudio.com/themes/AdminLTE/dist/img/user2-160x160.jpg';
  const response = await ctrl.postUser(name, email, password, imageUrl);

  if (!response.status) return resHandler(res, 401, 'User already registered');
  res.status(200).json({ message: 'User registered with success', token: response.token });
}));

router.get('/users', helper.asyncMiddleware(async (req, res) => {
  const authorization = 'authorization';
  let token = req.body.token || req.query.token || req.headers[authorization];
  const response = await ctrl.getUser(token);
  if (!response.status || response.data === null) return resHandler(res, 403, 'Unauthorized');
  res.status(200).json(response.data);
}));

router.patch('/users', helper.asyncMiddleware(async (req, res) => {
  const token = await helper.retrieveRequestToken(req);
  const response = await ctrl.updateUser(token, req.body);
  if (!response.status) return resHandler(res, 403, response.data);
  res.status(200).json({ data: response.data, message: 'User updated with success!' });
}));

router.delete('/users', helper.asyncMiddleware(async (req, res) => {
  const token = await helper.retrieveRequestToken(req);
  const response = await ctrl.deleteUser(token, req.body);
  if (!response.status) return resHandler(res, 403, 'Unauthorized to delete');
  res.status(200).json({ message: 'User deleted with success!' });
}));

router.delete('/all-users', helper.asyncMiddleware(async (req, res) => {
  const { key_admin } = req.body;
  if (key_admin === 'keyadmin123') {
    ctrl.deleteAllUsers();
    resHandler(res, 200, 'Users deleted with success');
  } else {
    resHandler(res, 403, 'Unauthorized access');
  }
}));

export default router;
