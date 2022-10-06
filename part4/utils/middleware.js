const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const logger = require('./logger');
const User = require('../models/user');

const requestLogger = morgan((tokens, req, res) => (
  [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    `Console log: ${JSON.stringify(req.body)}`,
  ].join(' ')
));

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  if (error.name === 'JsonWebTokenError') {
    return response.status(400).json({ error: request.token });
  }

  next(error);

  return response.status(400).send({ error: 'unknown error' });
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
  }

  next();
};

const userExtractor = async (request, response, next) => {
  const userToken = request.token;

  if (!userToken) {
    return response.status(401).json({ error: 'token missing' });
  }

  const userDecodedToken = jwt.verify(userToken, process.env.SECRET);

  if (!userDecodedToken) {
    return response.status(401).json({ error: 'invalid token' });
  }

  request.user = await User.findById(userDecodedToken.id);

  next();

  return false;
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
