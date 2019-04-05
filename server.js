const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const cors = require('./cors');
const routes = require('./routes');

const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cors);
server.use(morgan('tiny'));
server.use('/api/v1', routes);

server.listen(3000, () => {
  console.log('Run Auth API Server');
});
