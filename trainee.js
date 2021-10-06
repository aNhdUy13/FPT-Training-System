const express = require('express');
const router = express.Router();

const dbHandler = require('./databaseHandler');

router.get('/', (req, res) => {
    res.render('trainer/Home');
    res.render('trainee/traineeHome');

})

router.post('/updateTraineeAccount',async (req,res)=>{
    const id = req.body.id;
    const nameInput = req.body.txtName;
    const ageInput = req.body.txtAge;
    const dobInput = req.body.txtDoB;
    const educationInput = req.body.txtEducation;
    const roleInput = req.body.txtRole;
    const newValues ={$set : {name: nameInput,age: ageInput, dob: dobInput, education: educationInput, role : roleInput}};   
    await dbHandler.viewAllTrainerAccount("users", newValues);
    res.redirect('/trainee/traineeHome');
})

router.get('/traineeHome', async(req, res) => {
    const newValues = await dbHandler.viewAllTraineeAccount("users")
    res.render('trainee/traineeHome', { viewAllTraineeAccount: newValues });
})

module.exports = router;

