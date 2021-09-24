const express = require('express');
const router = express.Router();

const dbHandler = require('./databaseHandler');

router.get('/', (req, res) => {
    res.render('staff/staffHome');
})

router.get('/traineeManagement', (req, res) => {
    res.render('staff/traineeManagement');
})

router.get('/updateTraineeAccount', (req, res) => {
    res.render('staff/updateTraineeAccount');
})

/* Regarding Css */
router.use(express.static('public'));

/* (End) Regarding Css */


module.exports = router;