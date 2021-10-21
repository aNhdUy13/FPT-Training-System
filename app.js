const express = require('express');
const hbs = require('hbs');

const app = express();
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partial')

var bodyParser = require("body-parser");
//const { Console } = require('console');
app.use(bodyParser.urlencoded({ extended: false }));

const dbHandler = require('./databaseHandler');


var adminController = require('./login.js');
app.use('/', adminController);

app.get('/home', (req, res) => {
    res.render('main');
})


var adminController = require('./admin.js');
app.use('/admin', adminController);

var staffController = require('./staff.js');
app.use('/staff', staffController);

var trainerController = require('./trainer.js');
app.use('/trainer', trainerController);

var traineeController = require('./trainee.js');
app.use('/trainee', traineeController);



/* Regarding Css */
app.use(express.static('public'));

/* (End) Regarding Css */

// Hoang


const PORT = 5000;
app.listen(process.env.PORT || PORT);
console.log("FPT Training web is running !   Example app listening at http://localhost:5000 ");