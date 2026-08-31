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
    const sql = 'SELECT * FROM books ;';
    conn.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.render('home', { data: result });
    });
});

app.get('/add', function (req, res) {
    const sql = 'SELECT * FROM books ;'

    conn.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.render('add', { data: result });
    });
});

app.get('/edit/:id', function (req, res) {
    const book_id = req.params.id;
    const sql = 'SELECT * FROM books WHERE book_id = ?'

    conn.query(sql, [book_id], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.render('edit', { data: result });
    });
});

// book_id,
// book_name,
// author,
// category,
// price,
// stock

app.post('/add', (req, res) => {
    const { book_id,
        book_name,
        author,
        category,
        price,
        stock
    } = req.body;

    const insertSql = `
        INSERT INTO books
        (   book_id,
            book_name,
            author,
            category,
            price,
            stock)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    conn.query(insertSql,
        [book_id,
            book_name,
            author,
            category,
            price,
            stock
        ],
        (err, result) => {
            if (err) throw err;
            console.log("Data inserted");
            res.redirect('/');
        });
});

app.post('/edit/:id', (req, res) => {
    const old_book_id = req.params.id;

    const {
        book_id,
        book_name,
        author,
        category,
        price,
        stock
    } = req.body;

    const updateSql = `
        UPDATE books SET
            book_id = ?,
            book_name = ?,
            author = ?,
            category = ?,
            price = ?,
            stock = ?
        WHERE book_id = ?
    `;

    conn.query(
        updateSql,
        [   book_id, 
            book_name, 
            author, 
            category, 
            price, 
            stock, 
            old_book_id],
        (err, result) => {
            if (err) throw err;
            console.log('Data updated:', result.affectedRows);
            res.redirect('/');
        });
});

app.get('/delete/:id', (req, res) => {
    const book_id = req.params.id;
    const deleteSql = `DELETE FROM books WHERE book_id = ?`;

    conn.query(deleteSql, [book_id], (err, result) => {
        if (err) throw err;
        console.log("Data inserted");
        res.redirect('/');
    });
});

app.listen(port, () => {
    console.log(`listening to http://localhost:${port}`);
}); 