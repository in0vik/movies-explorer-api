const { PORT = 3000 } = process.env;
const { DB_ADDRESS = 'mongodb://127.0.0.1:27017/moviesexplorerdb' } = process.env;
const { NODE_ENV = 'development' } = process.env;
const { JWT_SECRET = 'secret' } = process.env;

module.exports = {
  PORT,
  DB_ADDRESS,
  NODE_ENV,
  JWT_SECRET,
}
