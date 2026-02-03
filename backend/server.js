const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const pool = require("./db");

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Login API
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    const user = userResult.rows[0];

    // Compare password
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    res.json({ message: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});

