const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "research",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
    throw err;
  }
  console.log("Connected to MySQL database.");
});

app.post("/api/register", async (req, res) => {
  const {
    email,
    password,
    name,
    role,
    researchInterest,
    enrollmentDate,
    academicLevel,
    specialization,
  } = req.body;

  try {
    // Check if user already exists
    const [existingUser] = await db
      .promise()
      .query("SELECT * FROM users WHERE email = ?", [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into users table
    const userQuery =
      "INSERT INTO users (email, password, name, role, research_interest) VALUES (?, ?, ?, ?, ?)";
    const [userResult] = await db
      .promise()
      .query(userQuery, [email, hashedPassword, name, role, researchInterest]);

    const userId = userResult.insertId;

    // Insert into students or mentors table based on role
    if (role === "student") {
      const studentQuery =
        "INSERT INTO students (user_id, enrollment_date, academic_level) VALUES (?, ?, ?)";
      await db
        .promise()
        .query(studentQuery, [userId, enrollmentDate, academicLevel]);
    } else if (role === "mentor") {
      const mentorQuery =
        "INSERT INTO mentors (name, specialization) VALUES (?, ?)";
      await db.promise().query(mentorQuery, [name, specialization]);
    }

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ message: "Registration failed" });
  }
});
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [results] = await db
      .promise()
      .query("SELECT * FROM users WHERE email = ?", [email]);
    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = results[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Database error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
