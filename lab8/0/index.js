// index.js
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// เพิ่มใช้งานไฟล์
const conn = require('./database');

// static resourse & template engine จำเป็นต้องมี
// static resourse
app.use(express.static('public'));
// Set EJS as templating engine
app.set('view engine', 'ejs');
// For parsing form data
app.use(express.urlencoded({ extended: true }));

// routing 
app.get('/', (req, res) => {
    res.send(`
    <a href='/form'>form</a>
    <a href='/showdata'>Show</a>
`)
});

app.get('/showdata', (req, res) => {

    const sql = 'SELECT * FROM student_score ;';
    conn.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.render('show', { data: result });
    });
});

app.get('/form', function (req, res) {
    res.sendFile(path.join(__dirname, "/public/form.html"));
});

app.get('/formget', (req, res) => {
    // read data from query string 
    const { id,
            name,
            department,
            mathematics,
            biology,
            physics,
            calculus,
            economics
        } = req.query;

    const insertSql = `
        INSERT INTO student_score
        (ID, Name, Department, Mathematics, Biology, Physics, Calculus, Economics)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    conn.query(insertSql,
        [id, name, department, mathematics, biology, physics, calculus, economics],
        (err, result) => {
        if (err) throw err;
        console.log("Data inserted");
        // res.send("Data inserted");
        res.redirect('/showdata');
    });
});

app.listen(port, () => {
    console.log(`listening to port ${port}`);
}); 