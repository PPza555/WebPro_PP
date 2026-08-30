const express = require('express');
const app = express()
const port = 3000;

const path = require('path')
app.use(express.static('public'))
app.use(express.static('fkles'))
app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '/public/home.html'));
});

app.get('/pad_thai', function(req, res){
    res.sendFile(path.join(__dirname, '/public/pad_thai.html'));
});

app.get('/tom_yum_goong', function(req, res){
    res.sendFile(path.join(__dirname, '/public/tom_yum_goong.html'));
});

app.get('/green_curry', function(req, res){
    res.sendFile(path.join(__dirname, '/public/green_curry.html'));
});

app.get('/tom_kha_gai', function(req, res){
    res.sendFile(path.join(__dirname, '/public/tom_kha_gai.html'));
});

app.get('/thai_omelette', function(req, res){
    res.sendFile(path.join(__dirname, '/public/thai_omelette.html'));
});

// app.get('/tom_kha_gai', function(req, res){
//     res.sendFile(path.join(__dirname, '/public/tom_kha_gai.html'));
// });


app.listen(port, () => {
  console.log(`Server is running on port ${port}, press Ctrl-C to terminate....`)
});
