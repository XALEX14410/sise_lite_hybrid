const mariadb = require('mariadb');
require('dotenv').config();

const dbUrl = new URL(process.env.URL_DATABASE);

const pool = mariadb.createPool({
  host: dbUrl.hostname,
  port: dbUrl.port,
  user: dbUrl.username,
  password: dbUrl.password,
  database: dbUrl.pathname.replace('/', ''),
  connectionLimit: 5
});

module.exports = pool;