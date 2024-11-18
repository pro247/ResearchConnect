const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

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

app.post("/api/register", (req, res) => {
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

  // Insert into users table
  const userQuery =
    "INSERT INTO users (email, password, name, role, research_interest) VALUES (?, ?, ?, ?, ?)";
  db.query(
    userQuery,
    [email, password, name, role, researchInterest],
    (err, results) => {
      if (err) {
        console.error("Error inserting data into users table:", err);
        return res.status(500).json({ message: "Registration failed" });
      }

      const userId = results.insertId;

      // Insert into students or mentors table based on role
      if (role === "student") {
        const studentQuery =
          "INSERT INTO students (user_id, enrollment_date, academic_level) VALUES (?, ?, ?)";
        db.query(
          studentQuery,
          [userId, enrollmentDate, academicLevel],
          (err) => {
            if (err) {
              console.error("Error inserting data into students table:", err);
              return res.status(500).json({ message: "Registration failed" });
            }
            res.status(201).json({ message: "User registered successfully" });
          }
        );
      } else if (role === "mentor") {
        const mentorQuery =
          "INSERT INTO mentors (name, specialization) VALUES (?, ?)";
        db.query(mentorQuery, [name, specialization], (err) => {
          if (err) {
            console.error("Error inserting data into mentors table:", err);
            return res.status(500).json({ message: "Registration failed" });
          }
          res.status(201).json({ message: "User registered successfully" });
        });
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
