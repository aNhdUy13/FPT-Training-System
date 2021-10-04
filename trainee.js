const express = require('express');
const router = express.Router();

const dbHandler = require('./databaseHandler');

router.get('/', (req, res) => {
    res.render('trainer/trainerHome');
})


module.exports = router;


router.post('/updateTraineeAccount',async (req,res)=>{
    const nameInput = req.body.txtName;
    const ageInput = req.body.txtAge;
    const dobInput = req.body.txtDoB;
    const educationInput = req.body.txtEducation;
    const dbo = await dbHandler.GetDB();
    const newValues ={$set : {name: nameInput,age: ageInput, dob: dobInput, education: educationInput}};
    
    await dbHandler.updateTraineeAccount("users", newValues);
    res.redirect('/view');
})