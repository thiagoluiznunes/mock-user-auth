import express from 'express';
import ctrl from './mock.controller';
const router = express.Router();

const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };

router.post('/auth', asyncMiddleware(async (req, res) => {
  const { email, password } = req.body;
  const response = await ctrl.isAuthenticated(email, password);

  if (!response.status || response.data === null) return res.status(401).json({ message: 'Incorrect email or password' });
  const id = response.data;
  const access_token = ctrl.createToken({ email, id });
  res.status(200).json({ token: access_token });
}));

router.post('/users', asyncMiddleware(async (req, res) => {
  const { name, email, password } = req.body;
  const imageUrl = 'https://almsaeedstudio.com/themes/AdminLTE/dist/img/user2-160x160.jpg';
  const response = await ctrl.postUser(name, email, password, imageUrl);

  if (!response.status) return res.status(401).json({ message: 'User already registered' });
  const id = response;
  const access_token = ctrl.createToken({ email, id });
  res.status(200).json({ message: 'User registered with success', token: access_token });
}));

router.get('/users', asyncMiddleware(async (req, res) => {
  const authorization = 'authorization';
  let token = req.body.token || req.query.token || req.headers[authorization];
  const response = await ctrl.getUser(token);
  if (!response.status || response.data === null) return res.status(403).json({ message: 'Unauthorized' });
  res.status(200).json(response.data);
}));

router.delete('/users', asyncMiddleware(async (req, res) => {
  const { key_admin } = req.body;
  if (key_admin === '123456') {
    ctrl.deleteUsers();
    res.status(200).json({ message: 'Users deleted with success' });
  } else {
    res.status(403).json({ message: 'Unauthorized rule' });
  }
}));

export default router;
