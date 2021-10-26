const express = require('express');
const router = express.Router();
const session=require('express-session');
const dbHandler = require('./databaseHandler');

// session middle ware
router.use(session({
    resave:true,
    saveUninitialized:true,
    secret:'group2huhuhu',
    cookie:{maxAge:1000000}
}))

router.get('/', (req, res) => {
    res.render('login');
})

router.post('/doLogin', async(req, res) => {
    var nameInput = req.body.txtUser;
    var passInput = req.body.txtPassword;
    const found = await dbHandler.checkUser(nameInput, passInput);
    if (found) {
        var findEmail = await dbHandler.emailFinding(nameInput);
        req.session.username=nameInput;
        if (findEmail[0].role == "trainee") {
            res.render('trainee/traineePage')
        } else if (findEmail[0].role == "trainer") {
            res.render('trainer/trainerPage')
        } else if (findEmail[0].role == "staff") {
            res.render('staff/staffHome')
        } else if (findEmail[0].role == "admin") {
            res.render('admin/adminHome')
        }
        //het phan role
    } else {
        res.render('login')
    }
})

module.exports = router;