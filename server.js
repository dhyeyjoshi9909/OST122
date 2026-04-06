const express = require('express');
const app = express();

// ✅ Middleware (VERY IMPORTANT)
app.use(express.json());

// In-memory data
let students = [
  { id: 1, name: "Viraj", branch: "CE" },
  { id: 2, name: "Ravi", branch: "CE" }
];

// GET all students
app.get('/students', (req, res) => {
  res.json(students);
});

// GET single student
app.get('/students/:id', (req, res) => {
  const student = students.find(s => s.id == req.params.id);

  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ message: "Student not found" });
  }
});

// ✅ POST - Add student (SAFE VERSION)
app.post('/students', (req, res) => {
  console.log("BODY:", req.body); // debug

  if (!req.body || !req.body.name || !req.body.branch) {
    return res.status(400).json({ message: "Invalid data! Send name and branch" });
  }

  const newStudent = {
    id: students.length + 1,
    name: req.body.name,
    branch: req.body.branch
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
});

// ✅ PUT - Update student (SAFE VERSION)
app.put('/students/:id', (req, res) => {
  const student = students.find(s => s.id == req.params.id);

  if (!req.body || !req.body.name || !req.body.branch) {
    return res.status(400).json({ message: "Invalid data!" });
  }

  if (student) {
    student.name = req.body.name;
    student.branch = req.body.branch;
    res.json(student);
  } else {
    res.status(404).json({ message: "Student not found" });
  }
});

// DELETE student
app.delete('/students/:id', (req, res) => {
  const exists = students.some(s => s.id == req.params.id);

  if (exists) {
    students = students.filter(s => s.id != req.params.id);
    res.json({ message: "Student deleted" });
  } else {
    res.status(404).json({ message: "Student not found" });
  }
});

// Start server
app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});