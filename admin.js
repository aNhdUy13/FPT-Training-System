const express = require('express');
const router = express.Router();
const session=require('express-session');
const dbHandler = require('./databaseHandler');

// session middle ware
router.use(session({
    resave:true,
    saveUninitialized:true,
    secret:'group2huhuhu',
    cookie:{maxAge:60000}
}))

router.get('/', (req, res) => {
    if(!req.session.username)
        res.render('login')
    res.render('admin/adminHome');
})
// START STAFF ROLE
router.get('/staffManagement', async(req, res) => {
    const result = await dbHandler.viewAllStaffAccount("users")

    res.render('admin/staffManagement', { viewAllStaffAccount: result });
})

// add Staff account
router.post('/doAddStaffAccount', async(req, res) => {

    var staffEmail = req.body.txtStaffEmail;
    var staffPassword = req.body.txtStaffPassword;
    var staffName = req.body.txtStaffName;
    var staffAge = req.body.txtStaffAge;
    var staffDoB = req.body.txtStaffDoB;
    var staffEducation = req.body.txtStaffEducation;

    if (staffName.trim().length < 5) {
        res.render('admin/staffManagement', { errorName: "Error : Name cannot lower than 5 " })

    } else if (staffEmail.trim().length == 0 || staffEmail.indexOf("@") == -1) {

        res.render('admin/staffManagement', { errorEmail: "Error : Fill the email / correct format " })
    } else if (staffPassword.trim().length == 0) {
        res.render('admin/staffManagement', { errorPassword: "Error : Fill the password " })
    } else if (staffAge.trim().length == 0 || isNaN(staffAge) == true) {

        res.render('admin/staffManagement', { errorAge: "Error : Fill the age and it must be integer " })
    } else if (staffAge < 0) {
        res.render('admin/staffManagement', { errorAge: "Error : Age cannot < 0 " })
    } else {
        await dbHandler.createStaffAccount("users", staffEmail, staffPassword, staffName,
            staffAge, staffDoB, staffEducation);

        res.redirect('staffManagement');
    }


})

//search Staff
router.post('/searchStaffAccount', async(req, res) => {
    const staffNameAgeSearch = req.body.txtStaffNameAgeSearch;

    const result = await dbHandler.searchStaffAccount("users", staffNameAgeSearch);

    res.render('admin/staffManagement', { viewAllStaffAccount: result });
})

//delete staff
router.get('/deleteStaffAccount', async(req, res) => {
    const id = req.query.id;

    await dbHandler.deleteFunction("users", id);
    res.redirect('staffManagement')
}) 
//update staff
router.get('/updateStaffAccount', async(req, res) => {

    const id = req.query.id;

    var staffAccountToEdit = await dbHandler.updateFunction("users", id);
    res.render('admin/updateStaffAccount', { staffDetail: staffAccountToEdit })

})
router.post('/doUpdateStaffAccount', async(req, res) => {
    const id = req.body.id;
    const nameUpdated = req.body.txtUpdateStaffName;
    const emailUpdated = req.body.txtUpdateStaffEmail;
    const passwordUpdated = req.body.txtUpdateStaffPassword;
    const ageUpdated = req.body.txtUpdateStaffAge;
    const dobUpdated = req.body.txtUpdateStaffDoB;
    const educationUpdated = req.body.txtUpdateStaffEducation;


    const newValue = {
        $set: {
            email: emailUpdated,
            name: nameUpdated,
            password: passwordUpdated,
            age: ageUpdated,
            DoB: dobUpdated,
            education: educationUpdated
        }
    };


    await dbHandler.doUpdateFunction("users", id, newValue);

    res.redirect('staffManagement')
})


// END STAFF ROLE 


// START TRAINER ROLE 
router.get('/trainerManagement', async(req, res) => {
    const result = await dbHandler.viewAllTrainerAccount("users")

    res.render('admin/trainerManagement', { viewAllTrainerAccount: result });
})

// add trainer account
router.post('/doAddTrainerAccount', async(req, res) => {

    var trainerEmail = req.body.txtTrainerEmail;
    var trainerPassword = req.body.txtTrainerPassword;
    var trainerName = req.body.txtTrainerName;
    var trainerAge = req.body.txtTrainerAge;
    var trainerDoB = req.body.txtTrainerDoB;
    var trainerEducation = req.body.txtTrainerEducation;

    if (trainerName.trim().length < 5) {
        res.render('admin/trainerManagement', { errorName: "Error : Name cannot lower than 5 " })

    } else if (trainerEmail.trim().length == 0 || trainerEmail.indexOf("@") == -1) {

        res.render('admin/trainerManagement', { errorEmail: "Error : Fill the email / correct format " })
    } else if (trainerPassword.trim().length == 0) {
        res.render('admin/trainerManagement', { errorPassword: "Error : Fill the password " })
    } else if (trainerAge.trim().length == 0 || isNaN(trainerAge) == true) {

        res.render('admin/trainerManagement', { errorAge: "Error : Fill the age and it must be integer " })
    } else if (trainerAge < 0) {
        res.render('admin/trainerManagement', { errorAge: "Error : Age cannot < 0 " })
    } else {
        await dbHandler.createTrainerAccount("users", trainerEmail, trainerPassword, trainerName,
        trainerAge, trainerDoB, trainerEducation);

        res.redirect('trainerManagement');
    }


})

//search trainer
router.post('/searchTrainerAccount', async(req, res) => {
    const trainerNameAgeSearch = req.body.txtTrainerNameAgeSearch;

    const result = await dbHandler.searchTrainerAccount("users", trainerNameAgeSearch);

    res.render('admin/trainerManagement', { viewAllTrainerAccount: result });
})

//delete trainer
router.get('/deleteTrainerAccount', async(req, res) => {
    const id = req.query.id;

    await dbHandler.deleteFunction("users", id);
    res.redirect('trainerManagement')
}) 
//update trainer
router.get('/updateTrainerAccount', async(req, res) => {

    const id = req.query.id;

    var trainerAccountToEdit = await dbHandler.updateFunction("users", id);
    res.render('admin/updateTrainerAccount', { trainerDetail: trainerAccountToEdit })

})
router.post('/doUpdateTrainerAccount', async(req, res) => {
    const id = req.body.id;
    const nameUpdated = req.body.txtUpdateTrainerName;
    const emailUpdated = req.body.txtUpdateTrainerEmail;
    const passwordUpdated = req.body.txtUpdateTrainerPassword;
    const ageUpdated = req.body.txtUpdateTrainerAge;
    const dobUpdated = req.body.txtUpdateTrainerDoB;
    const educationUpdated = req.body.txtUpdateTrainerEducation;


    const newValue = {
        $set: {
            email: emailUpdated,
            name: nameUpdated,
            password: passwordUpdated,
            age: ageUpdated,
            DoB: dobUpdated,
            education: educationUpdated
        }
    };


    await dbHandler.doUpdateFunction("users", id, newValue);

    res.redirect('trainerManagement')
})


//END TRAINER ROLE
module.exports = router;