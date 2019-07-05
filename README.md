# mock-user-auth

![npm](https://img.shields.io/npm/dt/mock-user-auth.svg)
[![npm version](https://badge.fury.io/js/mock-user-auth.svg)](https://badge.fury.io/js/mock-user-auth)
[![Build Status](https://travis-ci.org/thiagoluiznunes/mock-user-auth.svg?branch=master)](https://travis-ci.org/thiagoluiznunes/mock-user-auth)
[![Maintainability](https://api.codeclimate.com/v1/badges/b60e5e0c37609f6b21c0/maintainability)](https://codeclimate.com/github/thiagoluiznunes/mock-json-server/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/b60e5e0c37609f6b21c0/test_coverage)](https://codeclimate.com/github/thiagoluiznunes/mock-json-server/test_coverage)
[![Issue Count](https://codeclimate.com/github/thiagoluiznunes/mock-json-server/badges/issue_count.svg)](https://codeclimate.com/github/thiagoluiznunes/mock-json-server/issues)

<a target="_blank"  href="https://www.patreon.com/thiagoluiznunes">
<img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" alt="drawing" width="160" height="37"/>
</a>

&nbsp;

**[README.md pt-br](https://github.com/thiagoluiznunes/mock-user-auth/blob/master/README-pt-br.md)**

---
Mock-User-Auth is a mock user authentication API developed in Nodejs and Express using JWT as an authenticator in the ES6 version of JavaScript.

**The use**: It can be used to assist your front-end development. It's simple and fast, you just need to follow the steps below.


Toolkit: Node.js | Express.js | Mocha | Chai | Istanbul

### Requirements ###

* **[Node.js 11.x](http://nodejs.org/en/)** :white_check_mark:
* **[Npm 6.x](https://www.npmjs.com/)** :white_check_mark:

### Npm ###
1 - Install package:
```
$ npm i --save mock-user-auth
```
2 - Create script in package.json:
```json
 {
   "script": {
     "dev": "nodemon ./node_modules/mock-user-auth/bin/www.js"
   }
 }
```
3 - Start api:
```
$ npm run dev
```
**Option: You can set the port after npm command:**
```
$ npm run dev 8080
```


### Project Installation ###

**Obs.: The following instructions were tested on Ubuntu distribution.**

1 - After 'git clone' command, run the following commands to install dependencies:
  - user@user:~/path_to_cloned_folder/$ **npm install**
  - **Manually install the dependencies that may have not been installed by the above command.** :white_check_mark:

2 - Start application
  - use@user:~/path_to_cloned_folder/ **npm start**
  - Access the browser http://localhost:3000/api/v1/users

### API Routes ###
|   Action            | Required |  Method  | URL
|   ------------------|----------|----------|--------------
|   AUTHENTICATE USER |          | `POST`   | /api/v1/auth
|   CREATE USER       |          | `POST`   | /api/v1/users
|   GET USER          |   Auth   | `GET`    | /api/v1/users
|   PATCH USER        |   Auth   | `PATCH`  | /api/v1/users
|   DELETE USER       |   Auth   | `DELETE` | /api/v1/users
|   DELETE ALL USERS  |          | `DELETE` | /api/v1/users

#### AUTHENTICATE USER ####
* REQUEST
```
POST /api/v1/auth
```
```json
{
  "email": "user@gmail.com",
  "password": "user123"
}
```
* RESPONSE
```json
{
  "token": "eyJhbGciOiJI..."
}
```

#### CREATE USER ####
* REQUEST
```
POST /api/v1/users
```
```json
{
  "name": "user",
  "email": "user@gmail.com",
  "password": "user123"
}
```
* RESPONSE
```json
{
  "message": "User registered with success",
  "token": "eyJhbGciOiJI..."
}
```

#### GET USER BY TOKEN ####
* REQUEST
```
GET /api/v1/users
```
```javascript
const token = 'eyJhbGciOiJI...';
req.setRequestHeader('Authorization', token);
```
* RESPONSE
```json
{
  "id": 46643,
  "name": "user",
  "email": "user@gmail.com",
  "password": "user123",
  "imageUrl": "https://almsaeedstudio.com/themes/AdminLTE/dist/img/user2-160x160.jpg"
}
```

#### PATCH USER BY TOKEN ####
* REQUEST
```
PATCH /api/v1/users
```
```javascript
const token = 'eyJhbGciOiJI...';
req.setRequestHeader('Authorization', token);
```
```json
{
  "name": "newName",
  "email": "new_email@gmail.com",
  "password": "newpassword123"
}
```
* RESPONSE
```json
{
  "message": "User updated with success"
}
```

#### DELETE USER BY TOKEN ####
* REQUEST
```
DELETE /api/v1/users
```
```javascript
const token = 'eyJhbGciOiJI...';
req.setRequestHeader('Authorization', token);
```
* RESPONSE
```json
{
  "message": "User deleted with success"
}
```

#### DELETE ALL USERS ####
* REQUEST
```
DELETE /api/v1/all-users
```
```json
{
  "key_admin": "keyadmin123"
}
```
* RESPONSE
```json
{
  "message": "Users deleted with success"
}
```

### Authors

* Thiago Luiz Pereira Nunes ([ThiagoLuizNunes](https://github.com/ThiagoLuizNunes)) thiagoluiz.dev@gmail.com

### License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

>Created By **[ThiagoLuizNunes](https://www.linkedin.com/in/thiago-luiz-507483112/)** 2019.

---
