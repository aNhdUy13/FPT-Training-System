const express = require('express');
const hbs = require('hbs');

const app = express();
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partial')

var bodyParser = require("body-parser");
//const { Console } = require('console');
app.use(bodyParser.urlencoded({ extended: false }));

const dbHandler = require('./databaseHandler');





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


app.post('/doAddTraineeAccount', async(req, res) => {

    var traineeEmail = req.body.txtTraineeEmail;
    var traineePassword = req.body.txtTraineePassword;
    var traineeName = req.body.txtTraineeName;
    var traineeAge = req.body.txtTraineeAge;
    var traineeDoB = req.body.txtTraineeDoB;
    var traineeEducation = req.body.txtTraineeEducation;

    await dbHandler.createTraineeAccount("users", traineeEmail, traineePassword, traineeName,
        traineeAge, traineeDoB, traineeEducation);

    res.redirect('staff/traineeManagement');

})

app.get('/updateTraineeAccount', async(req, res) => {

    const id = req.query.id;

    var traineeAccountToEdit = await dbHandler.updateTraineeAccount("users", id);
    res.render('staff/updateTraineeAccount', { traineeDetail: traineeAccountToEdit })

})
app.post('/doUpdateTraineeAccount', async(req, res) => {
    const id = req.body.id;
    const nameUpdated = req.body.txtUpdateTraineeName;
    const emailUpdated = req.body.txtUpdateTraineeEmail;
    const ageUpdated = req.body.txtUpdateTraineeAge;
    const dobUpdated = req.body.txtUpdateTraineeDoB;
    const educationUpdated = req.body.txtUpdateTraineeEducation;


    const newValue = {
        $set: {
            email: emailUpdated,
            name: nameUpdated,
            age: ageUpdated,
            DoB: dobUpdated,
            education: educationUpdated
        }
    };


    await dbHandler.doUpdateTraineeAccount("users", id, newValue);

    res.redirect('staff/traineeManagement')
})

app.get('/deleteTraineeAccount', async(req, res) => {
    const id = req.query.id;

    await dbHandler.deleteTraineeAccount("users", id);
    res.redirect('staff/traineeManagement')
})

app.post('/searchTraineeAccount', async(req, res) => {
    const nameSearch = req.body.txtTraineeNameAgeSearch;

    const result = await dbHandler.searchTraineeAccount("users", nameSearch, nameSearch);

    res.render('staff/traineeManagement', { viewAllTraineeAccount: result });
})

const PORT = 5000;
app.listen(process.env.PORT || PORT);
console.log("FPT Training web is running !");