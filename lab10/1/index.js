const express = require("express");
const path = require("path");
const port = 3000;

// Creating the Express server
const app = express();

// static resourse & templating engine
app.use(express.static('public'));
// Set EJS as templating engine
app.set('view engine', 'ejs');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// จาก Web Service ที่อื่น
// หน้าแรก
app.get('/', (req, res) => {
    
    const endpoint = 'http://webdev.it.kmitl.ac.th:4000/restaurant';
    fetch(endpoint)
    .then(response => response.json())
    .then(rtr => {
        console.log(rtr);
        res.render('restarant', { data: rtr });
    })
    .catch(error => {
        console.log(error);
    });
});

// หน้า detail
app.get('/detail/:id', (req, res) => {

    const id = req.params.id;
    const endpoint = `http://webdev.it.kmitl.ac.th:4000/restaurant`;
    fetch(endpoint)
    .then(response => response.json())
    .then(rtr => {
        const item = rtr.find(restaurant => restaurant.product_id == id);   
        console.log(item);
        res.render('detail', { data: item });
    })
    .catch(error => {
        console.log(error);
    });
});






app.listen(port, () => {
  console.log(`Starting server at http://localhost:${port}`);
});
