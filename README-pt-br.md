# mock-user-auth

![npm](https://img.shields.io/npm/dt/mock-user-auth.svg)
[![npm version](https://badge.fury.io/js/mock-user-auth.svg)](https://badge.fury.io/js/mock-user-auth)
[![Build Status](https://travis-ci.org/thiagoluiznunes/mock-user-auth.svg?branch=master)](https://travis-ci.org/thiagoluiznunes/mock-user-auth)
[![Maintainability](https://api.codeclimate.com/v1/badges/b60e5e0c37609f6b21c0/maintainability)](https://codeclimate.com/github/thiagoluiznunes/mock-json-server/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/b60e5e0c37609f6b21c0/test_coverage)](https://codeclimate.com/github/thiagoluiznunes/mock-json-server/test_coverage)
[![Issue Count](https://codeclimate.com/github/thiagoluiznunes/mock-json-server/badges/issue_count.svg)](https://codeclimate.com/github/thiagoluiznunes/mock-json-server/issues)


---
Mock-User-Auth é uma API de autenticação de usuário mock desenvolvida em Nodejs e Express utilizando JWT como autenticador na versão ES6 do JavaScript.

**Objetivo**: pode ser usado para ajudar no desenvolvimento do front-end. É simples e rápido, você só precisa seguir os passos abaixo.


Ferramentas: Node.js | Express.js | Mocha | Chai | Istanbul

### Requerimentos ###

* **[Node.js 11.x](http://nodejs.org/en/)** :white_check_mark:
* **[Npm 6.x](https://www.npmjs.com/)** :white_check_mark:

### Npm ###
1 - Instalando pacote via npm:
```
$ npm i --save mock-user-auth
```
2 - Criando script no package.json:
```json
 {
   "script": {
     "dev": "nodemon ./node_modules/mock-user-auth/bin/www.js"
   }
 }
```
3 - Iniciando api:
```
$ npm run dev
```
**Opção: Você pode definir a porta após o comando npm:**
```
$ npm run dev 8080
```

### Instalação do Projeto ###

**Obs.: As seguintes instruções foram testadas na distribuição do Ubuntu.**

1 - Depois de clonar o repositório 'git clone' (comando), execute os seguintes comandos para instalar as dependências do projeto:
  - user@user:~/diretorio_projeto_clonado/$ **npm install**
  - **Instale manualmente as dependências que podem não ter sido instaladas pelo comando acima.** :white_check_mark:

2 - Iniciar aplicação
  - use@user:~/diretorio_projeto_clonado/ **npm start**
  - Acesse pelo nevagador http://localhost:3000/api/v1/users

### Rotas da API ###
|   Ação                   | Requerido  |  Método  | URL
|   -----------------------|------------|----------|--------------
|   AUTENTICAR USUÁRIO     |            | `POST`   | /api/v1/auth
|   CRIAR USUÁRIO          |            | `POST`   | /api/v1/users
|   OBTER USUÁRIO          | Autenticar | `GET`    | /api/v1/users
|   ATUALIZAR USUÁRIO      | Autenticar | `PATCH`  | /api/v1/users
|   DELETAR USUÁRIO        | Autenticar | `DELETE` | /api/v1/users
|   DELETAR TODOS USUÁRIOS |            | `DELETE` | /api/v1/users

#### AUTENTICAR USUÁRIO ####
* REQUISIÇÃO
```
POST /api/v1/auth
```
```json
{
  "email": "user@gmail.com",
  "password": "user123"
}
```
* RESPOSTA
```json
{
  "token": "eyJhbGciOiJI..."
}
```

#### CRIAR USUÁRIO ####
* REQUISIÇÃO
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
* RESPOSTA
```json
{
  "message": "User registered with success",
  "token": "eyJhbGciOiJI..."
}
```

#### OBTER USUÁRIO POR TOKEN ####
* REQUISIÇÃO
```
GET /api/v1/users
```
```javascript
const token = 'eyJhbGciOiJI...';
req.setRequestHeader('Authorization', token);
```
* RESPOSTA
```json
{
  "id": 46643,
  "name": "user",
  "email": "user@gmail.com",
  "password": "user123",
  "imageUrl": "https://almsaeedstudio.com/themes/AdminLTE/dist/img/user2-160x160.jpg"
}
```

#### ATUALIZAR USUÁRIO POR TOKEN ####
* REQUISIÇÃO
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
* RESPOSTA
```json
{
  "message": "User updated with success"
}
```

#### DELETAR USUÁRIO POR TOKEN ####
* REQUISIÇÃO
```
DELETE /api/v1/users
```
```javascript
const token = 'eyJhbGciOiJI...';
req.setRequestHeader('Authorization', token);
```
* RESPOSTA
```json
{
  "message": "User deleted with success"
}
```

#### DELETAR TODOS USUÁRIOS ####
* REQUISIÇÃO
```
DELETE /api/v1/all-users
```
```json
{
  "key_admin": "keyadmin123"
}
```
* RESPOSTA
```json
{
  "message": "Users deleted with success"
}
```

### Autor

* Thiago Luiz Pereira Nunes ([ThiagoLuizNunes](https://github.com/ThiagoLuizNunes)) thiagoluiz.dev@gmail.com

### Licença

Este projeto está licenciado sob a licença MIT - consulte o arquivo [LICENSE.md](LICENSE.md) para obter detalhes

>Criado por **[ThiagoLuizNunes](https://www.linkedin.com/in/thiago-luiz-507483112/)** 2019.

---
