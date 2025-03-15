// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 5000;


app.use(cors());
app.use(bodyParser.json());


const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '42162196@Jk',
  database: 'school_database',
  port: 3306, 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}).promise(); 

const insertAndReturn = async (query, values, table, idColumn) => {
  const [result] = await pool.query(query, values);
  const [newRow] = await pool.query(`SELECT * FROM ${table} WHERE ${idColumn} = ?`, [result.insertId]);
  return newRow[0];
};


app.get('/api/students', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Students ORDER BY student_id ASC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.post('/api/students', async (req, res) => {
  const { first_name, last_name, date_of_birth, gender, stream,contact_info } = req.body;
  try {
    const newStudent = await insertAndReturn(
      `INSERT INTO Students (first_name, last_name, date_of_birth, gender,stream, contact_info) VALUES (?, ?, ?, ?, ?, ?)`,
      [first_name, last_name, date_of_birth, gender,stream, contact_info],
      'Students',
      'student_id'
    );
    res.json(newStudent);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


app.get('/api/teachers', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Teachers ORDER BY teacher_id ASC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.post('/api/teachers', async (req, res) => {
  const { first_name, last_name,TSCNo, contact_info } = req.body;
  try {
    const newTeacher = await insertAndReturn(
      `INSERT INTO Teachers (first_name, last_name,TSCNo, contact_info) VALUES (?, ?, ?, ?)`,
      [first_name, last_name,TSCNo, contact_info],
      'Teachers',
      'teacher_id'
    );
    console.log("json file being sent",newTeacher);
    
    res.json(newTeacher);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


app.get('/api/classes', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Classes ORDER BY class_id ASC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.post('/api/classes', async (req, res) => {
  const { class_name } = req.body;
  try {
    const newClass = await insertAndReturn(
      `INSERT INTO Classes (class_name) VALUES (?)`,
      [class_name],
      'Classes',
      'class_id'
    );
    res.json(newClass);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


app.get('/api/subjects', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Subjects ORDER BY subject_id ASC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.post('/api/subjects', async (req, res) => {
  const { subject_name } = req.body;
  try {
    const newSubject = await insertAndReturn(
      `INSERT INTO Subjects (subject_name) VALUES (?)`,
      [subject_name],
      'Subjects',
      'subject_id'
    );
    res.json(newSubject);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


app.get('/api/exams', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Exams ORDER BY exam_id ASC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.post('/api/exams', async (req, res) => {
  const { subject_id, exam_date } = req.body;
  try {
    const newExam = await insertAndReturn(
      `INSERT INTO Exams (subject_id, exam_date) VALUES (?, ?)`,
      [subject_id, exam_date],
      'Exams',
      'exam_id'
    );
    res.json(newExam);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.get('/api/exam_results', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Exam_Results ORDER BY result_id ASC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.post('/api/exam_results', async (req, res) => {
  const { exam_id, marks_obtained } = req.body;
  try {
    const newExamResult = await insertAndReturn(
      `INSERT INTO Exam_Results (exam_id, marks_obtained) VALUES (?, ?)`,
      [exam_id, marks_obtained],
      'Exam_Results',
      'result_id'
    );
    res.json(newExamResult);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


app.get('/api/attendance', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Attendance ORDER BY attendance_id ASC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.post('/api/attendance', async (req, res) => {
  const { date, status } = req.body;
  try {
    const newAttendance = await insertAndReturn(
      `INSERT INTO Attendance (date, status) VALUES (?, ?)`,
      [date, status],
      'Attendance',
      'attendance_id'
    );
    res.json(newAttendance);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


app.get('/api/fees_payments', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Fees_Payments ORDER BY payment_id ASC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.post('/api/fees_payments', async (req, res) => {
  const { amount_paid, payment_date } = req.body;
  try {
    const newPayment = await insertAndReturn(
      `INSERT INTO Fees_Payments (amount_paid, payment_date) VALUES (?, ?)`,
      [amount_paid, payment_date],
      'Fees_Payments',
      'payment_id'
    );
    res.json(newPayment);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
