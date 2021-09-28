const express = require('express');
const router = express.Router();
const dbHandler = require('./databaseHandler');
const app = express();

router.get('/', (req, res) => {
    res.render('staff/staffHome');
})

/**
 * Nguyen DUy Anh
 */
router.get('/traineeManagement', async(req, res) => {
    const result = await dbHandler.viewAllTraineeAccount("users")

    res.render('staff/traineeManagement', { viewAllTraineeAccount: result });
})



router.post('/doAddTraineeAccount', async(req, res) => {

    var traineeEmail = req.body.txtTraineeEmail;
    var traineePassword = req.body.txtTraineePassword;
    var traineeName = req.body.txtTraineeName;
    var traineeAge = req.body.txtTraineeAge;
    var traineeDoB = req.body.txtTraineeDoB;
    var traineeEducation = req.body.txtTraineeEducation;

    if (traineeName.trim().length < 5) {
        res.render('staff/traineeManagement', { errorName: "Error : Name cannot lower than 5 " })

    } else if (traineeEmail.trim().length == 0) {

        res.render('staff/traineeManagement', { errorEmail: "Error : Fill the email " })
    } else if (traineePassword.trim().length == 0) {
        res.render('staff/traineeManagement', { errorPassword: "Error : Fill the password " })
    } else if (traineeAge.trim().length == 0 || isNaN(traineeAge) == true) {

        res.render('staff/traineeManagement', { errorAge: "Error : Fill the age and it must be integer " })
    } else if (traineeAge < 0) {
        res.render('staff/traineeManagement', { errorAge: "Error : Age cannot < 0 " })
    } else {
        await dbHandler.createTraineeAccount("users", traineeEmail, traineePassword, traineeName,
            traineeAge, traineeDoB, traineeEducation);

        res.redirect('traineeManagement');
    }


})

router.get('/updateTraineeAccount', async(req, res) => {

    const id = req.query.id;

    var traineeAccountToEdit = await dbHandler.updateTraineeAccount("users", id);
    res.render('staff/updateTraineeAccount', { traineeDetail: traineeAccountToEdit })

})
router.post('/doUpdateTraineeAccount', async(req, res) => {
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

    res.redirect('traineeManagement')
})

router.get('/deleteTraineeAccount', async(req, res) => {
    const id = req.query.id;

    await dbHandler.deleteTraineeAccount("users", id);
    res.redirect('traineeManagement')
})

router.post('/searchTraineeAccount', async(req, res) => {
    const traineeNameAgeSearch = req.body.txtTraineeNameAgeSearch;

    const result = await dbHandler.searchTraineeAccount("users", traineeNameAgeSearch);

    res.render('staff/traineeManagement', { viewAllTraineeAccount: result });
})


/**
 *  (END) Nguyen DUy Anh
 */



router.get('/CourseCategory', async(req, res) => {
    const result = await dbHandler.viewAllCourseCategory("courseCategory")

    res.render('staff/CourseCategory', { viewAllCourseCategory: result });
})



/* Regarding Css */
router.use(express.static('public'));

/* (End) Regarding Css */


module.exports = router;