const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'research'
});


db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database.');


    const createMentorshipsTable = () => {
        const query = `
        CREATE TABLE IF NOT EXISTS mentorships (
            id INT AUTO_INCREMENT PRIMARY KEY,
            mentor_id INT,
            research_area VARCHAR(255),
            FOREIGN KEY (mentor_id) REFERENCES users(id)
        )`;

        db.query(query, (err) => {
            if (err) {
                console.error('Error creating mentorships table:', err);
            } else {
                console.log('Mentorships table created successfully.');
            }
        });
    };

    createMentorshipsTable();
});

app.post('/api/register', (req, res) => {
    const { email, password, name, role, researchInterest } = req.body;

    const query = 'INSERT INTO users (email, password, name, role, research_interest) VALUES (?, ?, ?, ?, ?)';
    
    db.query(query, [email, password, name, role, researchInterest], (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ message: 'Registration failed' });
        }

        matchMentors(researchInterest, results.insertId);

        res.status(201).json({ message: 'User registered successfully' });
    });
});


const matchMentors = (researchInterest, studentId) => {
    const query = 'SELECT * FROM users WHERE role = "mentor" AND research_interest = ?';
    db.query(query, [researchInterest], (err, mentors) => {
        if (err) {
            console.error('Error fetching mentors:', err);
            return;
        }

        mentors.forEach(mentor => {
            const insertConnectionQuery = 'INSERT INTO connections (student_id, mentor_id, status) VALUES (?, ?, "pending")';
            db.query(insertConnectionQuery, [studentId, mentor.id], (err) => {
                if (err) {
                    console.error('Error inserting connection:', err);
                } else {
                    
                    console.log(`Notification sent to mentor ${mentor.name}`);
                }
            });
        });
    });
};


app.get('/api/connections', (req, res) => {
    const studentId = req.user.id; 
    const query = `
        SELECT c.id, m.name AS mentor_name, c.status 
        FROM connections c 
        JOIN users m ON c.mentor_id = m.id 
        WHERE c.student_id = ?`;

    db.query(query, [studentId], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        res.json(results);
    });
});


app.get('/api/pending-requests', (req, res) => {
    const mentorId = req.user.id; 
    const query = `
        SELECT c.id, s.name AS student_name 
        FROM connections c 
        JOIN users s ON c.student_id = s.id 
        WHERE c.mentor_id = ? AND c.status = 'pending'`;

    db.query(query, [mentorId], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        res.json(results);
    });
});


app.post('/api/response/:requestId', (req, res) => {
    const { requestId } = req.params;
    const { accept } = req.body;

    const status = accept ? 'accepted' : 'rejected';
    const query = 'UPDATE connections SET status = ? WHERE id = ?';

    db.query(query, [status, requestId], (err) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        res.json({ message: `Request ${status}` });
    });
});


app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const user = results[0];
        
      
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const mentorQuery = `
            SELECT m.id, m.name, m.research_interest 
            FROM users m 
            JOIN mentorships mt ON m.id = mt.mentor_id 
            WHERE mt.research_area = ?`;
        
        db.query(mentorQuery, [user.research_interest], (err, mentors) => {
            if (err) {
                return res.status(500).json({ message: 'Error fetching mentors' });
            }

    
            mentors.forEach(mentor => {
                const insertConnectionQuery = 'INSERT INTO connections (student_id, mentor_id, status) VALUES (?, ?, "pending")';
                db.query(insertConnectionQuery, [user.id, mentor.id], (err) => {
                    if (err) {
                        console.error('Error inserting connection:', err);
                    } else {
                        console.log(`Connected ${user.name} to mentor ${mentor.name}`);
                    }
                });
            });

            res.status(200).json({ message: 'Login successful', user, mentors });
        });
    });
});


app.post('/api/request-connection', (req, res) => {
    const { studentId, researchInterest } = req.body;

    const query = 'SELECT * FROM users WHERE role = "mentor" AND research_interest = ?';
    db.query(query, [researchInterest], (err, mentors) => {
        if (err) {
            console.error('Error fetching mentors:', err);
            return res.status(500).json({ message: 'Error fetching mentors' });
        }

        mentors.forEach(mentor => {
            const insertConnectionQuery = 'INSERT INTO connections (student_id, mentor_id, status) VALUES (?, ?, "pending")';
            db.query(insertConnectionQuery, [studentId, mentor.id], (err) => {
                if (err) {
                    console.error('Error inserting connection:', err);
                } else {
                    console.log(`Notification sent to mentor ${mentor.name}`);
                }
            });
        });

        res.status(200).json({ message: 'Connection requests sent to mentors' });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
