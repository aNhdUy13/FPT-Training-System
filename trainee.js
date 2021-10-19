const express = require('express');
const router = express.Router();

const dbHandler = require('./databaseHandler');

router.get('/', (req, res) => {
    res.render('trainee/traineeHome');

})


router.get('/traineeHome', async(req, res) => {
    const newValues = await dbHandler.viewAllTraineeAccount("users")
    res.render('trainee/traineeHome', { viewAllTraineeAccount: newValues });
})

module.exports = router;