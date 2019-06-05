# mock-json-server

[![Build Status](https://travis-ci.org/thiagoluiznunes/mock-json-server.svg?branch=master)](https://travis-ci.org/thiagoluiznunes/mock-json-server)
[![Maintainability](https://api.codeclimate.com/v1/badges/b60e5e0c37609f6b21c0/maintainability)](https://codeclimate.com/github/thiagoluiznunes/mock-json-server/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/b60e5e0c37609f6b21c0/test_coverage)](https://codeclimate.com/github/thiagoluiznunes/mock-json-server/test_coverage)
[![Issue Count](https://codeclimate.com/github/thiagoluiznunes/mock-json-server/badges/issue_count.svg)](https://codeclimate.com/github/thiagoluiznunes/mock-json-server/issues)

---
This project contains an authenticated REST API developed in Node.js that is testable by Mocha & Chai and was encoded using the ESLint standard and the ES6 version of JavaScript.

**The use**: It can be used to assist your front-end development. It's simple and fast, you just need to follow the steps below.


Toolkit: Node.js | Express.js | Mocha | Chai | Istanbul

### Requirements ###

* **[Node.js v11.14.0](http://nodejs.org/en/)** :white_check_mark:
* **[Express.js ~4.16.0](http://expressjs.com/)** :white_check_mark:
* **[Mocha 6.1.2](https://mochajs.org/)** :white_check_mark:
* **[Chai.js 4.2.0](https://www.chaijs.com/)** :white_check_mark:
* **[Istanbul.js 13.3.0](https://istanbul.js.org/)** :white_check_mark:

### Installation ###

**Obs.: The following instructions were tested on Ubuntu distribution.**

1. After 'git clone' command, run the following commands to install dependencies:
  - user@user:~/path_to_cloned_folder/$ **npm install**
  - **Manually install the dependencies that may have not been installed by the above command.** :white_check_mark:

2. Start application
  - use@user:~/path_to_cloned_folder/ **npm start**
  - Access the browser http://localhost:3000/api/v1/users

### API Routes ###
|   Action            | Required |  Method  | URL
|   ------------------|----------|----------|--------------
|   AUTHENTICATE USER |          | `POST`   | /api/v1/auth
|   CREATE USER       |          | `POST`   | /api/v1/users
|   GET USER          | Auth     | `GET`    | /api/v1/users
|   DELETE USERS      |          | `DELETE` | /api/v1/users

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

#### GET USER ####
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

#### DELETE USERS ####
* REQUEST
```
DELETE /api/v1/users
```
```json
{
  "key_admin": "123456"
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
