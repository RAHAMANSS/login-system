const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "login_db",
  password: "1234",
  port: 5432,
});

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.log("Connection failed:", err.message);
  } else {
    console.log("Connected! Time:", res.rows[0]);
  }
  pool.end();
});
