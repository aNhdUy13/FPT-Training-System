const express = require('express');
const router = express.Router();

const dbHandler = require('./databaseHandler');

router.get('/', (req, res) => {
    res.render('trainer/Home');
})

router.post('/viewAllTraineeAccount',async (req,res)=>{
    const id = req.body.id;
    const nameInput = req.body.txtName;
    const ageInput = req.body.txtAge;
    const dobInput = req.body.txtDoB;
    const educationInput = req.body.txtEducation;
    const roleInput = req.body.txtRole;
    const newValues ={$set : {name: nameInput,age: ageInput, dob: dobInput, education: educationInput, role : roleInput}};      
    await dbHandler.viewAllTraineeAccount("users", newValues);
    res.redirect('/trainer');
})

module.exports = router;

