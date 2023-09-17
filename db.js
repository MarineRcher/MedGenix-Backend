require('dotenv').config();
const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  acquireTimeout: 6000000
});

pool.getConnection()
  .then(connection => {
    console.log("Connected to MariaDB!");
    connection.release(); // Libérer la connexion immédiatement car nous n'en avons pas besoin ici.
  })
  .catch(error => {
    console.error("Error connecting to MariaDB:", error);
  });

module.exports = { pool };



