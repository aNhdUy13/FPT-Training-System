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


router.get('/updateTraineeAccount', (req, res) => {

    res.render('staff/updateTraineeAccount');
})


// router.post('/doAddTraineeAccount', async(req, res) => {

//     console.log("Add Trainee Account !");

//     var traineeEmail = req.body.txtTraineeEmail;
//     var traineePassword = req.body.txtTraineePassword;
//     var traineeName = req.body.txtTraineeName;
//     var traineeAge = req.body.txtTraineeAge;
//     var traineeDoB = req.body.txtTraineeDoB;
//     var traineeEducation = req.body.txtTraineeEducation;

//     await dbHandler.createTraineeAccount("users", traineeEmail, traineePassword, traineeName,
//         traineeAge, traineeDoB, traineeEducation);

//     res.redirect('/traineeManagement');

// })
// router.get('/deleteTraineeAccount', async(req, res) => {
//     const id = req.query.id;

//     await dbHandler.deleteTraineeAccount("users", id);
//     res.redirect('/traineeManagement')
// })
router.get('/CourseCategory', async(req, res) => {
    const result = await dbHandler.viewAllCourseCategory("courseCategory")

    res.render('staff/CourseCategory', { viewAllCourseCategory: result });
})

/**
 *  (END) Nguyen DUy Anh
 */




/* Regarding Css */
router.use(express.static('public'));

/* (End) Regarding Css */


module.exports = router;