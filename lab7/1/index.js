const express = require('express');
const app = express();
const port = 3000;

const path = require('path')
app.use(express.static('public'))
app.use(express.static('files'))
app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '/public/home.html'));
});

app.get('/cats', function(req, res){
    res.sendFile(path.join(__dirname, '/public/cats.html'));
});

app.get('/dogs', function(req, res){
    res.sendFile(path.join(__dirname, '/public/dogs.html'));
});

app.get('/birds', function(req, res){
    res.sendFile(path.join(__dirname, '/public/birds.html'));
});

app.get('/about', function(req, res){
    res.sendFile(path.join(__dirname, '/public/about.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}, press Ctrl-C to terminate....`)
});