const express = require('express');
const hbs = require('hbs');

const app = express();
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partial')

var bodyParser = require("body-parser");
//const { Console } = require('console');
app.use(bodyParser.urlencoded({ extended: false }));




app.get('/', (req, res) => {
    res.render('login');
})

app.get('/home', (req, res) => {
    res.render('main');
})


var adminController = require('./admin.js');
app.use('/admin', adminController);

var adminController = require('./staff.js');
app.use('/staff', adminController);

var adminController = require('./trainer.js');
app.use('/trainer', adminController);

var adminController = require('./trainee.js');
app.use('/trainee', adminController);



/* Regarding Css */
app.use(express.static('public'));

/* (End) Regarding Css */

const PORT = 5000;
app.listen(process.env.PORT || PORT);
console.log("Console ATN web is running !");