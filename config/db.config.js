require("dotenv").config();
const mysql = require("mysql");

const host = process.env.AI_DB_HOST || "localhost";
const user = process.env.AI_DB_USER || "ai";
const password = process.env.AI_DB_PASSWORD || "password";
const database = process.env.AI_DB_DATABASE || "ai";

const dbConn = mysql.createConnection({
  host,
  user,
  password,
  database,
});

dbConn.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database");
});

module.exports = dbConn;
