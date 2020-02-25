const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config()

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

server.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to your final Sprint Challenge this side of LABS!!!' });
  });

module.exports = server;
