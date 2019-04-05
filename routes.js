const express = require('express');
const faker = require('faker');
const db = require('./db');
const jwt = require('jsonwebtoken');
const router = express.Router();

// router.post('/auth/validateToken', (req, res) => {
//   const token = req.body.token || '';
//   jwt.verify(token, SECRET_KEY, err => err ? res.status(400).send({ valid: !err }) : res.status(200).send({ valid: !err }));
// });

router.post('/auth', (req, res) => {
  const { email, password } = req.body;
  db.isAuthenticated(email, password).then(response => {
    if (!response) res.status(401).json({ message : 'Incorrect email or password'});
    const id = response;
    const access_token = db.createToken({ email, id });
    res.status(200).json({ token: access_token });
  });
});

router.post('/users', (req, res) => {
  const { name, email, password } = req.body;
  const imageUrl = 'https://almsaeedstudio.com/themes/AdminLTE/dist/img/user2-160x160.jpg';
  db.createUser(name, email, password, imageUrl)
    .then((response) => {
      if (!response) return res.status(401).json({ message: 'User already registered' });
      const id = response;
      const access_token = db.createToken({ email, id });
      res.status(200).json({ message: 'User registered with success', token: access_token });
    })
    .catch(err => {
      throw err;
    });
});

router.get('/users', (req, res) => {
  const authorization = 'authorization';
  const token = req.body.token || req.query.token || req.headers[authorization];
  console.log(token)
  db.getUser(token)
    .then(response => {
      if (!response) return res.status(403).json( {message: 'Token invalid!' });
      res.status(200).json({ message: 'Get user authorized', data: response.data });
    })
    .catch(err => {
      throw err;
    });
});

module.exports = router;
