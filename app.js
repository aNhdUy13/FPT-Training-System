const express = require('express');
const hbs = require('hbs');

const app = express();
app.set('view engine', 'hbs');



var bodyParser = require("body-parser");
//const { Console } = require('console');
app.use(bodyParser.urlencoded({ extended: false }));



app.get('/', (req, res) => {
    res.render('main');
})

app.get('/home', (req, res) => {
    res.render('main');
})


/* Regarding Css */
app.use(express.static('public'));

/* (End) Regarding Css */

const PORT = 5000;
app.listen(process.env.PORT || PORT);
console.log("Console ATN web is running !");