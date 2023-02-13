const { PORT = 3000 } = process.env;
const { DB_ADDRESS = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const { NODE_ENV = 'development' } = process.env;
const { JWT_SECRET = 'secret' } = process.env;

// JWT_SECRET = NODE_ENV === 'production' ? JWT_SECRET : 'secret'

module.exports = {
  PORT,
  DB_ADDRESS,
  NODE_ENV,
  JWT_SECRET,
};
