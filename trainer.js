const express = require('express');
const router = express.Router();

const dbHandler = require('./databaseHandler');

router.get('/', (req, res) => {
    res.render('trainer/trainerHome');
})


module.exports = router;