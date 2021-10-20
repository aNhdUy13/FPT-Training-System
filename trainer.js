const express = require('express');
const router = express.Router();

const dbHandler = require('./databaseHandler');

router.get('/', (req, res) => {
    res.render('trainer/Home');
})


router.post('/viewAllTrainerAccount',async (req,res)=>{
    const id = req.body.id;
    const nameInput = req.body.txtName;
    const ageInput = req.body.txtAge;
    const dobInput = req.body.txtDoB;
    const educationInput = req.body.txtEducation;
    const roleInput = req.body.txtRole;
    const newValues ={$set : {id:id, name: nameInput,age: ageInput, dob: dobInput, education: educationInput, role : roleInput}};   
    await dbHandler.viewAllTrainerAccount("users", newValues);
    res.redirect('/trainer/trainerHome');
})

router.get('/trainerHome', async(req, res) => {
    const newValues = await dbHandler.viewAllTrainerAccount("users")
    res.render('trainer/trainerHome', { viewAllTrainerAccount: newValues });
})

router.get('/viewAllTrainee', async(req, res) => {
    const result = await dbHandler.viewAll("course");
    const getCourse = await dbHandler.getData("course");
    const result1 = await dbHandler.viewAll("users");
    const getTraineeName = await dbHandler.getTraineeName("users");
    const result2 = await dbHandler.viewAll("assignCourse");
    res.render('trainer/viewAllTrainee', { viewAllAssign: result2, viewAll: result, viewAllTraineeAccount: result1, getAllCourse: getCourse, getAllTrainee: getTraineeName  });
})

router.get('/viewCourse', async(req, res) => {
    const result = await dbHandler.viewAll("course");
    const getCourse = await dbHandler.getData("course");
    const result1 = await dbHandler.viewAll("users");
    const getTrainerName = await dbHandler.getTrainerName("users");
    const result2 = await dbHandler.viewAll("assignCourse1");
    res.render('trainer/viewCourse', { viewAllAssign1: result2, viewAll: result, viewAllTraineeAccount: result1, getAllCourse: getCourse, getAllTrainer: getTrainerName  });
})

router.post('/searchTrainerCourse', async(req, res) => {
    const traineeCourseSearch = req.body.txtTraineeCourseSearch;
    const result = await dbHandler.searchTrainerCourse("assignCourse", traineeCourseSearch);
    res.render('trainer/viewAllTrainee', {viewAllAssign: result});
    console.log(result);
})


router.get('/updateTrainerAccount', async(req, res) => {

    const id = req.query.id;
    var trainerAccountToEdit = await dbHandler.updateFunctionTrainer("users", id);
    res.render('trainer/updateTrainerAccount', { trainerDetail: trainerAccountToEdit })
})

router.post('/doUpdateTrainerAccount', async(req, res) => {
    const id = req.body.id;
    const nameUpdated = req.body.txtUpdateTrainerName;
    const emailUpdated = req.body.txtUpdateTrainerEmail;
    const ageUpdated = req.body.txtUpdateTrainerAge;
    const dobUpdated = req.body.txtUpdateTrainerDoB;
    const educationUpdated = req.body.txtUpdateTrainerEducation;
  //  const imageUpdated = req.body.txtUpdateTrainerImage;
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
    res.redirect('trainerHome')
});

module.exports = router;


