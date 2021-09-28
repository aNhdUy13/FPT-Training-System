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

// Hoang
app.post('/addCourseCategory', async(req, res) => {
    const nameCourseCate = req.body.txtNameCourseCategory;
    const descriptionCourseCate = req.body.txtCourseDescription;
    const dataCourseCategory = { name: nameCourseCate, description: descriptionCourseCate }
    await dbHandler.insertCourseCategory("courseCategory", dataCourseCategory);

    res.redirect('staff/CourseCategory');

})
app.get('/deleteCourseCategory', async(req, res) => {
    const id = req.query.id;

    await dbHandler.deleteCourseCategory("courseCategory", id);
    res.redirect('staff/CourseCategory')
})
app.post('/searchCourseCategory', async(req, res) => {
        const nameCourseCate = req.body.txtNameCourseCategory;

        const result = await dbHandler.searchCourseCategory("courseCategory", nameCourseCate);

        res.render('staff/CourseCategory', { viewAllCourseCategory: result });
    })
    // Hoang

const PORT = 5000;
app.listen(process.env.PORT || PORT);
console.log("FPT Training web is running !");