const bcrypt = require("bcrypt");
const pool = require("./db");

const createUser = async () => {
  try {
    const email = "admin@example.com";
    const password = "123456"; // plain password

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into database
    await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) ON CONFLICT (email) DO NOTHING",
      [email, hashedPassword]
    );

    console.log("User created!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit();
  }
};

createUser();
