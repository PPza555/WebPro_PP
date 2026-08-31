// index.js
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// เพิ่มใช้งานไฟล์
const conn = require('./database');

// static resourse & template engine จำเป็นต้องมี
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    const sql = 'SELECT * FROM albums ;';
    conn.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.render('index', { data: result });
    });
});

app.listen(port, () => {
    console.log(`listening to http://localhost:${port}`);
}); 
