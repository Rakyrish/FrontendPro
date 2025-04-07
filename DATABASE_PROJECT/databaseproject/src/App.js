// src/App.js
import React, { useState, useEffect } from 'react';
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Box,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Button,
  Grid,
} from '@mui/material';
import axios from 'axios';


function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}


function StudentsComponent() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    gender: '',
    stream: '',
    contact_info: '',
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/students');
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/students', form);
      setStudents([...students, res.data]);
      setForm({
        first_name: '',
        last_name: '',
        date_of_birth: '',
        gender: '',
        stream: '',
        contact_info: '',
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Typography variant="h5">Students</Typography>
      <Paper style={{ padding: '20px', marginBottom: '20px' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="First Name" name="first_name" value={form.first_name} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Last Name" name="last_name" value={form.last_name} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Date of Birth"
                name="date_of_birth"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={form.date_of_birth}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Gender" name="gender" value={form.gender} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Stream" name="stream" value={form.stream} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Contact Info" name="contact_info" value={form.contact_info} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Add Student
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Stream</TableCell>
              <TableCell>Parent/Guardian info</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.student_id}>
                <TableCell>{student.student_id}</TableCell>
                <TableCell>{student.first_name}</TableCell>
                <TableCell>{student.last_name}</TableCell>
                <TableCell>{student.date_of_birth}</TableCell>
                <TableCell>{student.gender}</TableCell>
                <TableCell>{student.stream}</TableCell>
                <TableCell>{student.contact_info}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}


function TeachersComponent() {
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    TSCNo: '',
    contact_info: '',
  });

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/teachers');
      setTeachers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/teachers', form);
      setTeachers([...teachers, res.data]);
      setForm({ first_name: '', last_name: '', TSCNo: '', contact_info: '' });
      console.log(form.TSCNo);
      
    } catch (err) {
      console.error(err);
    }
  };
  // console.log("line 187 TSC No", TSCNo);

  return (
    <>
      <Typography variant="h5">Teachers</Typography>
      <Paper style={{ padding: '20px', marginBottom: '20px' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="First Name" name="first_name" value={form.first_name} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Last Name" name="last_name" value={form.last_name} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Contact Info" name="contact_info" value={form.contact_info} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Add Teacher
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Contact Info</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teachers.map((teacher) => (
              <TableRow key={teacher.teacher_id}>
                <TableCell>{teacher.teacher_id}</TableCell>
                <TableCell>{teacher.first_name}</TableCell>
                <TableCell>{teacher.last_name}</TableCell>
                <TableCell>{teacher.contact_info}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}


function ClassesComponent() {
  const [classesData, setClassesData] = useState([]);
  const [form, setForm] = useState({
    class_name: '',
    teacher: '',
  });

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/classes');
      setClassesData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/classes', form);
      setClassesData([...classesData, res.data]);
      setForm({ class_name: '', teacher: '' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Typography variant="h5">Classes</Typography>
      <Paper style={{ padding: '20px', marginBottom: '20px' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="Class Name" name="class_name" value={form.class_name} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Class Teacher" name="teacher" value={form.teacher} onChange={handleChange} fullWidth required/>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Add Class
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Class Name</TableCell>
              <TableCell> Class Teacher </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classesData.map((cls) => (
              <TableRow key={cls.class_id}>
                <TableCell>{cls.class_id}</TableCell>
                <TableCell>{cls.class_name}</TableCell>
                <TableCell>{cls.teacher}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}


function SubjectsComponent() {
  const [subjects, setSubjects] = useState([]);
  const [form, setForm] = useState({
    subject_name: '',
    teacher: '',
  });

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/subjects');
      setSubjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/subjects', form);
      setSubjects([...subjects, res.data]);
      setForm({ subject_name: '', teacher: '' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Typography variant="h5">Subjects</Typography>
      <Paper style={{ padding: '20px', marginBottom: '20px' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="Subject Name" name="subject_name" value={form.subject_name} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Teacher" name="teacher" value={form.teacher} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Add Subject
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Subject Name</TableCell>
              <TableCell>Teacher</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subjects.map((subj) => (
              <TableRow key={subj.subject_id}>
                <TableCell>{subj.subject_id}</TableCell>
                <TableCell>{subj.subject_name}</TableCell>
                <TableCell>{subj.teacher}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}


function ExamsComponent() {
  const [exams, setExams] = useState([]);
  const [form, setForm] = useState({
    teacher_name: '',
    subject: '',
    exam_date: '',
  });

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/exams');
      setExams(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/exams', form);
      setExams([...exams, res.data]);
      setForm({ teacher_name: '', subject: '', exam_date: '' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Typography variant="h5">Exams</Typography>
      <Paper style={{ padding: '20px', marginBottom: '20px', direction: "flex", }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
              <TextField label="Teacher" name="teacher_name" value={form.teacher_name} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Subject" name="subject" value={form.subject} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Exam Date"
                name="exam_date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={form.exam_date}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Add Exam
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Teacher</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Exam Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exams.map((exam) => (
              <TableRow key={exam.exam_id}>
                <TableCell>{exam.exam_id}</TableCell>
                <TableCell>{exam.teacher_name}</TableCell>
                <TableCell>{exam.subject}</TableCell>
                <TableCell>{exam.exam_date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}


function ExamResultsComponent() {
  const [results, setResults] = useState([]);
  const [form, setForm] = useState({
    student_name: '',
   subject: '',
    marks_obtained: '',
  });

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/exam_results');
      setResults(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/exam_results', form);
      setResults([...results, res.data]);
      setForm({ student_id: '', exam_id: '', marks_obtained: '' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Typography variant="h5">Exam Results</Typography>
      <Paper style={{ padding: '20px', marginBottom: '20px' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField label="Student Name" name="student_name" value={form.student_name} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField label="Subject" name="subject" value={form.subject} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField label="Marks Obtained" name="marks_obtained" type="number" value={form.marks_obtained} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Add Result
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Marks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((resItem) => (
              <TableRow key={resItem.result_id}>
                <TableCell>{resItem.result_id}</TableCell>
                <TableCell>{resItem.student_name}</TableCell>
                <TableCell>{resItem.subject}</TableCell>
                <TableCell>{resItem.marks_obtained}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}


function AttendanceComponent() {
  const [attendance, setAttendance] = useState([]);
  const [form, setForm] = useState({
    student_name: '',
    class_name: '',
    date: '',
    status: '',
  });

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/attendance');
      setAttendance(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/attendance', form);
      setAttendance([...attendance, res.data]);
      setForm({ student_id: '', class_id: '', date: '', status: '' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Typography variant="h5">Attendance</Typography>
      <Paper style={{ padding: '20px', marginBottom: '20px' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <TextField label="Student Name" name="student_name" value={form.student_name} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField label="Class Name" name="class_name" value={form.class_name} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Date"
                name="date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={form.date}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField label="Status (Present/Absent)" name="status" value={form.status} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Add Attendance
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Class </TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendance.map((att) => (
              <TableRow key={att.attendance_id}>
                <TableCell>{att.attendance_id}</TableCell>
                <TableCell>{att.student_name}</TableCell>
                <TableCell>{att.class_name}</TableCell>
                <TableCell>{att.date}</TableCell>
                <TableCell>{att.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}


function FeesPaymentsComponent() {
  const [payments, setPayments] = useState([]);
  const [form, setForm] = useState({
    student_id: '',
    amount_paid: '',
    payment_date: '',
  });

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/fees_payments');
      setPayments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/fees_payments', form);
      setPayments([...payments, res.data]);
      setForm({ student_id: '', amount_paid: '', payment_date: '' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Typography variant="h5">Fees Payments</Typography>
      <Paper style={{ padding: '20px', marginBottom: '20px' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
              <TextField label="Student Name" name="student_name"  value={form.student_name} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField label="Amount Paid" name="amount_paid" type="number" value={form.amount_paid} onChange={handleChange} fullWidth required />
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <TextField
                label="Payment Date"
                name="payment_date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={form.payment_date}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Add Payment
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Amount Paid</TableCell>
              <TableCell>Payment Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((pay) => (
              <TableRow key={pay.payment_id}>
                <TableCell>{pay.payment_id}</TableCell>
                <TableCell>{pay.student_name}</TableCell>
                <TableCell>{pay.amount_paid}</TableCell>
                <TableCell>{pay.payment_date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}


function App() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">School Database Management</Typography>
        </Toolbar>
      </AppBar>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="Students" />
        <Tab label="Teachers" />
        <Tab label="Classes" />
        <Tab label="Subjects" />
        <Tab label="Exams" />
        <Tab label="Exam Results" />
        <Tab label="Attendance" />
        <Tab label="Fees Payments" />
      </Tabs>
      <TabPanel value={tabValue} index={0}>
        <StudentsComponent />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <TeachersComponent />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <ClassesComponent />
      </TabPanel>
      <TabPanel value={tabValue} index={3}>
        <SubjectsComponent />
      </TabPanel>
      <TabPanel value={tabValue} index={4}>
        <ExamsComponent />
      </TabPanel>
      <TabPanel value={tabValue} index={5}>
        <ExamResultsComponent />
      </TabPanel>
      <TabPanel value={tabValue} index={6}>
        <AttendanceComponent />
      </TabPanel>
      <TabPanel value={tabValue} index={7}>
        <FeesPaymentsComponent />
      </TabPanel>
    </Container>
  );
}

export default App;
