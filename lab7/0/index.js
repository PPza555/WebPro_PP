
const express = require('express');
const app = express();
const port = 3000;

const path = require('path');
// Serve static files from multiple directories
app.use(express.static('public'));
app.use(express.static('files'));
// Or specify a virtual path prefix
app.use('/static', express.static(path.join(__dirname, 'public')))


app.get('/', function(req, res){
    // res.send("<h1>Welcome to the homepage!</h1>");
    res.sendFile(path.join(__dirname, '/public/home.html'));
});

app.get('/about', function(req, res){
    // res.send("Hello World!, via GET");
    res.sendFile(path.join(__dirname, '/public/about.html'));
});

app.get('/form', function(req, res){
    res.sendFile(path.join(__dirname, '/public/form.html'));
});

app.get('/submitform', (req, res) => {
  // Access query parameters using req.query
  const { fname, lname } = req.query;
  res.send(`First name: ${fname}, Last name: ${lname}`);
});

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/submitform', (req, res) => {
  // Access query parameters using req.query
  const { fname, lname } = req.body;
  res.send(`First name: ${fname}, Last name: ${lname}`);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}, press Ctrl-C to terminate....`)
});

