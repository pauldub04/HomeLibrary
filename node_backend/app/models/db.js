const mysql = require('mysql');
const dbConfig = require("../config/db.config.js");

const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected to database");
});

module.exports = connection;
