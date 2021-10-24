const express = require('express');
const router = express.Router();
const dbHandler = require('./databaseHandler');
const app = express();
const session=require('express-session');
// const multer = require('multer');
// fs = require('fs-extra')
// app.use(bodyParser.urlencoded({ extended: true }))

// session middle ware
router.use(session({
    resave:true,
    saveUninitialized:true,
    secret:'group2huhuhu',
    cookie:{maxAge:100000}
}))

router.get('/', (req, res) => {
    if(!req.session.username)
        return res.render('login')
    res.render('staff/staffHome');
})

/**
 * Nguyen DUy Anh
 */
router.get('/traineeManagement', async(req, res) => {
    const result = await dbHandler.viewAllTraineeAccount("users")
    if(!req.session.username)
        return res.render('login')
    res.render('staff/traineeManagement', { viewAllTraineeAccount: result });
})


// var storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, 'uploads')
//     },
//     filename: function(req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// })

// var upload = multer({ storage: storage })

router.post('/doAddTraineeAccount', async(req, res) => {

    var traineeEmail = req.body.txtTraineeEmail;
    var traineePassword = req.body.txtTraineePassword;
    var traineeName = req.body.txtTraineeName;
    var traineeAge = req.body.txtTraineeAge;
    var traineeDoB = req.body.txtTraineeDoB;
    var traineeEducation = req.body.txtTraineeEducation;
    var traineeImage = req.body.imgTrainee;

    //const checkExistEmail = await dbHandler.checkExistEmail("users", traineeEmail);

    if (traineeName.trim().length < 5) {

        res.render('staff/traineeManagement', { errorName: "Error : Name cannot lower than 5 " })

    } else if (traineeEmail.trim().length == 0) {

        res.render('staff/traineeManagement', { errorEmail: "Error : Fill the email " })
    }
    //  else if (checkExistEmail == "Email already in exists !") {

    //     res.render('staff/traineeManagement', { errorEmail: "Error : Email already in exists !!" })
    // }
    else if (traineePassword.trim().length == 0) {

        res.render('staff/traineeManagement', { errorPassword: "Error : Fill the password " })
    } else if (traineeAge.trim().length == 0 || isNaN(traineeAge) == true) {

        res.render('staff/traineeManagement', { errorAge: "Error : Fill the age and it must be integer " })
    } else if (traineeAge < 0) {

        res.render('staff/traineeManagement', { errorAge: "Error : Age cannot < 0 " })
    } else if (traineeImage.trim().length == "") {

        traineeImage = "https://cdn-icons-png.flaticon.com/128/320/320369.png";
        await dbHandler.createTraineeAccount("users", traineeEmail, traineePassword, traineeName,
            traineeAge, traineeDoB, traineeEducation, traineeImage);

        res.redirect('traineeManagement');

    } else {

        await dbHandler.createTraineeAccount("users", traineeEmail, traineePassword, traineeName,
            traineeAge, traineeDoB, traineeEducation, traineeImage);

        res.redirect('traineeManagement');
    }


})

router.get('/updateTraineeAccount', async(req, res) => {

    const id = req.query.id;

    var traineeAccountToEdit = await dbHandler.updateFunction("users", id);
    if(!req.session.username)
        return res.render('login')
    res.render('staff/updateTraineeAccount', { traineeDetail: traineeAccountToEdit })

})

router.post('/doUpdateTraineeAccount', async(req, res) => {
    const id = req.body.id;
    const nameUpdated = req.body.txtUpdateTraineeName;
    const emailUpdated = req.body.txtUpdateTraineeEmail;
    const ageUpdated = req.body.txtUpdateTraineeAge;
    const dobUpdated = req.body.txtUpdateTraineeDoB;
    const educationUpdated = req.body.txtUpdateTraineeEducation;
    const imageUpdated = req.body.txtUpdateTraineeImage;


    const newValue = {
        $set: {
            email: emailUpdated,
            name: nameUpdated,
            age: ageUpdated,
            DoB: dobUpdated,
            education: educationUpdated,
            //image: imageUpdated
        }
    }



    await dbHandler.doUpdateFunction("users", id, newValue);

    res.redirect('traineeManagement')
});

router.get('/deleteTraineeAccount', async(req, res) => {
    const id = req.query.id;

    await dbHandler.deleteFunction("users", id);
    if(!req.session.username)
        return res.render('login')
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
// Hoang - Course Category

router.post('/addCourseCategory', async(req, res) => {
    const nameCourseCate = req.body.txtNameCourseCategory;
    const descriptionCourseCate = req.body.txtCourseDescription;
    const dataCourseCategory = { name: nameCourseCate, description: descriptionCourseCate }
    await dbHandler.insertFunction("courseCategory", dataCourseCategory);

    res.redirect('CourseCategory');

})
router.get('/deleteCourseCategory', async(req, res) => {
    const id = req.query.id;

    await dbHandler.deleteFunction("courseCategory", id);
    if(!req.session.username)
        return res.render('login')
    res.redirect('CourseCategory')
})
router.post('/searchCourseCategory', async(req, res) => {
    const nameCourseCate = req.body.txtNameCourseCategory;

    const result = await dbHandler.searchCourseCategory("courseCategory", nameCourseCate);

    res.render('staff/CourseCategory', { viewAllCourseCategory: result });
})

router.get('/CourseCategory', async(req, res) => {
    const result = await dbHandler.viewAll("courseCategory")
    if(!req.session.username)
        return res.render('login')
    res.render('staff/CourseCategory', { viewAllCourseCategory: result });
})
router.get('/updateCourseCategory', async(req, res) => {

    const id = req.query.id;

    var editCourseCategory = await dbHandler.updateFunction("courseCategory", id);
    if(!req.session.username)
        return res.render('login')
    res.render('staff/updateCourseCategory', { courseCategory: editCourseCategory })

})
router.post('/doupdateCourseCategory', async(req, res) => {
        const id = req.body.id;
        const nameCourseCate = req.body.txtNameCourseCategory;
        const desCourseCate = req.body.txtDesCourseCategory;

        const editCourseCategory = { $set: { name: nameCourseCate, description: desCourseCate } };
        await dbHandler.doUpdateFunction("courseCategory", id, editCourseCategory);
        res.redirect('CourseCategory')
    })
    // Hoang - Course
router.post('/addCourse', async(req, res) => {
    const nameCourse = req.body.txtNameCourse;
    const courseCategory = req.body.txtCourseCategory;
    const descriptionCourse = req.body.txtCourseDescription;
    const dataCourseCategory = { name: nameCourse, courseCategory: courseCategory, description: descriptionCourse }
    await dbHandler.insertFunction("course", dataCourseCategory);

    res.redirect('Course');

})
router.post('/searchCourse', async(req, res) => {
    const nameCourse = req.body.txtNameCourse;

    const result = await dbHandler.searchCourseCategory("course", nameCourse);
    res.render('staff/Course', { viewAll: result });
})
router.get('/deleteCourse', async(req, res) => {
    const id = req.query.id;

    await dbHandler.deleteFunction("course", id);
    if(!req.session.username)
        return res.render('login')
    res.redirect('Course')
})
router.get('/Course', async(req, res) => {
    const result = await dbHandler.viewAll("course");
    const result1 = await dbHandler.viewAll("courseCategory");
    if(!req.session.username)
    return res.render('login')
    res.render('staff/Course', { viewAll: result, viewCourseCate: result1 });
})
router.get('/updateCourse', async(req, res) => {

    const id = req.query.id;
    const result1 = await dbHandler.viewAll("courseCategory");

    var editCourse = await dbHandler.updateFunction("course", id);
    if(!req.session.username)
        return res.render('login')
    res.render('staff/updateCourse', { course: editCourse, viewCourseCate: result1 })

})
router.post('/doupdateCourse', async(req, res) => {
        const id = req.body.id;
        const nameCourse = req.body.txtNameCourse;
        const desCourse = req.body.txtDesCourse;

        const editCourse = { $set: { name: nameCourse, description: desCourse } };
        await dbHandler.doUpdateFunction("course", id, editCourse);
        res.redirect('Course')
    })
    // Hoang END
    // Tan - assign Trainer, Trainee a Course

router.post('/searchAssign', async(req, res) => {
    const nameCourseA = req.body.txtNameCourseAssign;

    const result = await dbHandler.searchAssign("assignCourse", nameCourseA);
    res.render('staff/AssignTrainee', { viewAllAssign: result });
})

router.get('/AssignTrainee', async(req, res) => {
    const result = await dbHandler.viewAll("course");
    const getCourse = await dbHandler.getData("course");
    const result1 = await dbHandler.viewAll("users");
    const getTraineeName = await dbHandler.getTraineeName("users");
    const result2 = await dbHandler.viewAll("assignCourse");
    if(!req.session.username)
        return res.render('login')
    res.render('staff/AssignTrainee', { viewAllAssign: result2, viewAll: result, viewAllTraineeAccount: result1, getAllCourse: getCourse, getAllTrainee: getTraineeName });
})

router.post('/addAssign', async(req, res) => {
    const nameTraineeAssign = req.body.txtNameTraineeAssign;
    const nameCourseAssign = req.body.txtNameCourseAssign;
    const duration = req.body.txtDuration;
    const dataAssign = { name: nameTraineeAssign, name1: nameCourseAssign, dura: duration }
    await dbHandler.insertFunction("assignCourse", dataAssign);

    res.redirect('AssignTrainee');
})

router.get('/deleteAssign', async(req, res) => {
    const id = req.query.id;

    await dbHandler.deleteFunction("assignCourse", id);
    if(!req.session.username)
        return res.render('login')
    res.redirect('AssignTrainee')
})

router.post('/searchAssign1', async(req, res) => {
    const nameCourseA = req.body.txtNameCourseAssign;

    const result = await dbHandler.searchAssign("assignCourse1", nameCourseA);
    res.render('staff/AssignTrainer', { viewAllAssign: result });
})

router.get('/AssignTrainer', async(req, res) => {
    const result = await dbHandler.viewAll("course");
    const getCourse = await dbHandler.getData("course");
    const result1 = await dbHandler.viewAll("users");
    const getTrainerName = await dbHandler.getTrainerName("users");
    const result2 = await dbHandler.viewAll("assignCourse1");
    if(!req.session.username)
        return res.render('login')
    res.render('staff/AssignTrainer', { viewAllAssign: result2, viewAll: result, viewAllTraineeAccount: result1, getAllCourse: getCourse, getAllTrainee: getTrainerName });
})

router.post('/addAssign1', async(req, res) => {
    const nameTrainerAssign = req.body.txtNameTrainerAssign;
    const nameCourseAssign = req.body.txtNameCourseAssign;
    const duration = req.body.txtDuration;
    const dataAssign = { name: nameTrainerAssign, name1: nameCourseAssign, dura: duration }
    await dbHandler.insertFunction("assignCourse1", dataAssign);

    res.redirect('AssignTrainer');
})

router.get('/deleteAssign1', async(req, res) => {
        const id = req.query.id;

        await dbHandler.deleteFunction("assignCourse1", id);
        res.redirect('AssignTrainer')
    })
    /* Regarding Css */
router.use(express.static('public'));

/* (End) Regarding Css */
module.exports = router;