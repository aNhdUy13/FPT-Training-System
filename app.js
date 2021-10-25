const express = require('express');
const hbs = require('hbs');
const path = require('path');
const app = express();
app.set('view engine', 'hbs');
const session=require('express-session');

const viewPath = path.join(__dirname, 'views/partial')
hbs.registerPartials(viewPath)

// session middle ware
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:'group2huhuhu',
    cookie:{maxAge:100000}
}))

//const { Console } = require('console');
app.use(express.urlencoded({ extended: false }));

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



app.use(express.static('public'));


const PORT = 5000;
app.listen(process.env.PORT || PORT);
console.log("FPT Training web is running !   Example app listening at http://localhost:5000 ");