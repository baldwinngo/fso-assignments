const morgan = require('morgan');
const logger = require('./logger');

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

  next(error);

  return response.status(400).send({ error: 'unknown error' });
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
