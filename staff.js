const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('staff/staffHome');
})


module.exports = router;