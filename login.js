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
        res.render('testlogin',{model:findEmail})    
    }
    else{
        res.render('login')
    }
})


module.exports = router;