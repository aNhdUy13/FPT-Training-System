const express = require('express');
const router = express.Router();
const session=require('express-session');
const dbHandler = require('./databaseHandler');

// session middle ware
router.use(session({
    resave:true,
    saveUninitialized:true,
    secret:'group2huhuhu',
    cookie:{maxAge:100000}
}))

router.get('/', (req, res) => {
    if(!req.session.username)
        return res.render('login')
    res.render('trainee/traineePage');

})

router.get('/traineeHome', async(req, res) => {
    const newValues = await dbHandler.viewAllTraineeAccount("users")
    if(!req.session.username)
        return res.render('login')
    res.render('trainee/traineeHome', { viewAllTraineeAccount: newValues });
})

router.get('/viewCourseTrainee', async(req, res) => {
    const result = await dbHandler.viewAll("course");
    const getCourse = await dbHandler.getData("course");
    const result1 = await dbHandler.viewAll("users");
    const getTraineeName = await dbHandler.getTraineeName("users");
    const result2 = await dbHandler.viewAll("assignCourse");
    if(!req.session.username)
        return res.render('login')
    res.render('trainee/viewCourseTrainee', { viewAllAssign2: result2, viewAll: result, viewAllTraineeAccount: result1, getAllCourse: getCourse, getAllTrainee: getTraineeName  });
})

module.exports = router;