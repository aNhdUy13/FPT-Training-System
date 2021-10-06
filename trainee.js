const express = require('express');
const router = express.Router();

const dbHandler = require('./databaseHandler');

router.get('/', (req, res) => {
    res.render('trainer/trainerHome');
})

router.post('/updateTraineeAccount',async (req,res)=>{
    const nameInput = req.body.txtName;
    const ageInput = req.body.txtAge;
    const dobInput = req.body.txtDoB;
    const educationInput = req.body.txtEducation;
    const newValues ={$set : {name: nameInput,age: ageInput, dob: dobInput, education: educationInput}};
    
    await dbHandler.updateFunction("users", newValues);
    res.redirect('/view');
})


module.exports = router;


