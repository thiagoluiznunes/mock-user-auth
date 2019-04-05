const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const cors = require('./cors');
const routes = require('./routes');

const server = express();
const port = process.argv[2] || 3000;

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cors);
server.use(morgan('tiny'));
server.use('/api/v1', routes);

server.listen(port, () => {
  console.log('Run Auth API Server');
});
