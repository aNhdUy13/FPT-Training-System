const express = require('express');
const router = express.Router();

const dbHandler = require('./databaseHandler');


router.get('/', (req, res) => {
    res.render('login');
})

router.post('/doLogin',async(req,res)=>{
    var nameInput = req.body.txtUser;
    var passInput = req.body.txtPassword;
    const found = await dbHandler.checkUser(nameInput,passInput);
    if(found){
        var findEmail = await dbHandler.emailFinding(nameInput);     
        console.log(findEmail[0].role);
        //phan role
        if( findEmail[0].role == "trainee")
        {
            res.render('trainee/traineehome');
        }else if(findEmail[0].role == "trainer")
        {
            res.render('trainer/trainerhome')
        }else if(findEmail[0].role == "staff")
        {
            res.render('staff/staffhome')
        }else if(findEmail[0].role == "admin")
        {
            res.render('admin/adminhome')
        }
        //het phan role
    }
    else{
        res.render('login')
    }
})


module.exports = router;