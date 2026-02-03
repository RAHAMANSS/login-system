// db.js
const { Pool } = require("pg");

// Create a new Pool instance
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "login_db",
  password: "1234",
  port: 5432,
});

// Test the connection
pool.connect((err, client, release) => {
  if (err) {
    console.error("Error connecting to database:", err.stack);
  } else {
    console.log("Database connected successfully!");
    release();
  }
});

module.exports = pool;


