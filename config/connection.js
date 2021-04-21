const Sequelize = require('sequelize');
require('dotenv').config();

let connection;

// create connection to our db
if (process.env.NODE_ENV === 'production' && process.env.JAWSDB_URL) {
  connection = new Sequelize(process.env.JAWSDB_URL);
} else {
  connection = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PW,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = connection;
