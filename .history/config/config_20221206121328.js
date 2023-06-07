require('dotenv').config();

const devConfig = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  secretKey: process.env.SECRET_KEY,
};

module.exports = {
  development: devConfig,
};
