const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const authRouter = require('../routers/auth-router.js');
const todosRouter = require('../routers/todos-router.js');
const usersRouter = require('../routers/users-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(morgan('dev'));
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/todos', todosRouter)
server.use('/api/users', usersRouter)

server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});

module.exports = server;
