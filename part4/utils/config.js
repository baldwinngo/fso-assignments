require('dotenv').config();

const PORT = process.env.PORT || 3003;
const MONGO_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGO_URL
  : process.env.MONGO_URL;

module.exports = {
  MONGO_URI,
  PORT,
};
