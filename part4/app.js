const express = require('express');
const cors = require('cors');
require('express-async-errors');
// const mongoose = require('mongoose');
const config = require('./utils/config');

const app = express();

const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');

logger.info('connecting to', config.MONGO_URI);

// mongoose.connect(config.MONGO_URI)
//   .then(() => {
//     logger.info('connected to MongoDB');
//   })
//   .catch((error) => {
//     logger.error('error connecting to MongoDB:', error.message);
//   });

app.use(cors());
// app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/blogs', blogsRouter);

app.use(middleware.tokenExtractor);
app.use(middleware.userExtractor);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
