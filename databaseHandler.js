var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://duyanhday:duyanh12345678@cluster0-shard-00-00.dgakd.mongodb.net:27017,cluster0-shard-00-01.dgakd.mongodb.net:27017,cluster0-shard-00-02.dgakd.mongodb.net:27017/FPTcoSystem?replicaSet=atlas-48tdag-shard-0&ssl=true&authSource=admin";
const dbName = "FPTcoSystem";

async function getDBO() {
    const client = await MongoClient.connect(url);
    const dbo = client.db(dbName);
    return dbo;
}

/* Login  thang beo    */

async function checkUser(nameIn, passwordIn) {
    const dbo = await getDBO();
    const results = await dbo.collection("users").
    findOne({ $and: [{ email: nameIn }, { password: passwordIn }] });

    if (results != null)
        return true;
    else
        return false;
}
async function emailFinding(emailIn) {
    const dbo = await getDBO();
    const resultss = await dbo.collection("users").
    find({ email: emailIn }).toArray();
    return resultss;
}

/* ======== Admin  Role ========*/


// manage staff 
async function viewAllStaffAccount(collectionName) {
    const dbo = await getDBO();
    const result = await dbo.collection(collectionName).find({ role: 'staff' }).toArray();

    return result;
}

async function createStaffAccount(collectionName, emailStaff, passwordStaff, nameStaff,
    ageStaff, DoBStaff, educationStaff) {

    const dbo = await getDBO();
    var newStaffAccount = {
        email: emailStaff,
        password: passwordStaff,
        name: nameStaff,
        age: ageStaff,
        DoB: DoBStaff,
        education: educationStaff,
        role: "staff"
    };

    await dbo.collection(collectionName).insertOne(newStaffAccount);
}

async function searchStaffAccount(collectionName, staffNameAgeSearch) {
    const dbo = await getDBO();
    const result = await dbo.collection(collectionName).find({
        role: "staff",
        $or: [{ name: staffNameAgeSearch }, { age: staffNameAgeSearch }]
    }).toArray();

    return result;
}

//Manage trainer
async function viewAllTrainerAccount(collectionName) {
    const dbo = await getDBO();
    const result = await dbo.collection(collectionName).find({ role: 'trainer' }).toArray();
    return result;
}

async function viewProfile(collectionName,email) {
    const dbo = await getDBO();
    const result = await dbo.collection(collectionName).find({ email: email }).toArray();
    return result;
}

async function createTrainerAccount(collectionName, emailTrainer, passwordTrainer, nameTrainer,
    ageTrainer, DoBTrainer, educationTrainer) {

    const dbo = await getDBO();
    var newTrainerAccount = {
        email: emailTrainer,
        password: passwordTrainer,
        name: nameTrainer,
        age: ageTrainer,
        DoB: DoBTrainer,
        education: educationTrainer,
        role: "trainer"
    };

    await dbo.collection(collectionName).insertOne(newTrainerAccount);
}

async function searchTrainerAccount(collectionName, trainerNameAgeSearch) {
    const dbo = await getDBO();
    const result = await dbo.collection(collectionName).find({
        role: "trainer",
        $or: [{ name: trainerNameAgeSearch }, { age: trainerNameAgeSearch }]
    }).toArray();

    return result;
}

/* (END) Admin Role */



/* ======== Staff Role ========*/
async function createTraineeAccount(collectionName, emailTrainee, passwordTrainee, nameTrainee,
    ageTrainee, DoBTrainee, educationTrainee, traineeImage) {

    const dbo = await getDBO();
    var newTraineeAccount = {
        email: emailTrainee,
        password: passwordTrainee,
        name: nameTrainee,
        age: ageTrainee,
        DoB: DoBTrainee,
        education: educationTrainee,
        image: traineeImage,
        role: "trainee"
    };

    await dbo.collection(collectionName).insertOne(newTraineeAccount);
}
async function checkExistEmail(collectionName, userEmail) {
    const dbo = await getDBO();

    const result = await dbo.collection(collectionName).findOne({ email: userEmail });

    var message;
    if (result) {
        message = "Email already in exists !";
    } else {
        message = "Good Email";
    }
    return message;

}

async function viewAllTraineeAccount(collectionName) {
    const dbo = await getDBO();
    const result = await dbo.collection(collectionName).find({ role: 'trainee' }).toArray();

    return result;
}


async function deleteFunction(collectionName, Id) {
    const dbo = await getDBO();

    var ObectID = require('mongodb').ObjectID;
    // Lấy Id gửi về
    const condition = { "_id": ObectID(Id) };

    //console.log(notToDelete);
    await dbo.collection(collectionName).deleteOne(condition); //await đợi đến khi kết thúc
}

async function updateFunction(collectionName, Id) {
    const dbo = await getDBO();

    var ObectID = require('mongodb').ObjectID;
    // Lấy Id gửi về
    const condition = { "_id": ObectID(Id) };

    const traineeAccountToEdit = await dbo.collection(collectionName).findOne(condition);
    return traineeAccountToEdit;
}

async function updateFunctionTrainer(collectionName, Id) {
    const dbo = await getDBO();
    var ObectID = require('mongodb').ObjectID;
    const condition = { "_id": ObectID(Id) };

    const trainerAccountToEdit = await dbo.collection(collectionName).findOne(condition);
    return trainerAccountToEdit;
}

async function doUpdateFunction(collectionName, Id, newValues) {
    const dbo = await getDBO();

    var ObectID = require('mongodb').ObjectID;
    // Lấy Id gửi về
    const condition = { "_id": ObectID(Id) };
    await dbo.collection(collectionName).updateOne(condition, newValues);
}

async function searchTraineeAccount(collectionName, traineeNameAgeSearch) {
    const dbo = await getDBO();

    // search gần đúng (var re = /\w+\s/g ; g = global ; )
    //const searchCondition = new RegExp(collectionName, 'i') // i = case-insensitive (k phân biệt chữ hoa thường)
    //const result = await dbo.collection(collectionName).find({ name: nameSearch }).toArray();

    // const result = await dbo.collection(collectionName).find({
    //     role: "trainee",
    //     $or: [{ name: traineeNameAgeSearch }, { age: traineeNameAgeSearch }]
    // }).toArray();

    const result = await dbo.collection(collectionName).find({
        role: "trainee",
        $or: [{ name: new RegExp(traineeNameAgeSearch, 'i') }, { age: traineeNameAgeSearch }]
    }).toArray();

    return result;
}
// trainer search course to show trainee: 
async function searchTrainerCourse(collectionName, traineeCourseSearch) {
    const dbo = await getDBO();
    const result = await dbo.collection(collectionName).find({
        name1: traineeCourseSearch
    }).toArray();
    return result;
}
async function checkExistCourse(collectionName, courseName) {
    const dbo = await getDBO();

    const result = await dbo.collection(collectionName).findOne({ name: courseName });

    var message;
    if (result) {
        message = "Course Name already in exists !";
    } else {
        message = "Suitable course name";
    }
    return message;

}
async function checkExistCourseCate(collectionName, courseCateName) {
    const dbo = await getDBO();

    const result = await dbo.collection(collectionName).findOne({ name: courseCateName });

    var message;
    if (result) {
        message = "Course Category Name already in exists !";
    } else {
        message = "Suitable Course category name";
    }
    return message;

}


async function getTraineeName(collectionName) {
    const dbo = await getDBO();
    const result = await dbo.collection(collectionName).find({ role: 'trainee' }).toArray();
    return result;
}

async function getTrainerName(collectionName) {
    const dbo = await getDBO();
    const result = await dbo.collection(collectionName).find({ role: 'trainer' }).toArray();
    return result;
}

async function insertFunction(collectionName, data) {
    const dbo = await getDBO();
    await dbo.collection(collectionName).insertOne(data);

}
async function searchCourseCategory(collectionName, nameCourseCate) {
    const dbo = await getDBO();
    const result = await dbo.collection(collectionName ).find({ name: nameCourseCate }).toArray();

    return result;
}
async function searchCourse(collectionName, nameCourseCate) {
    const dbo = await getDBO();
    const result = await dbo.collection(collectionName).find({$or: [{ name: nameCourseCate },{courseCategory: nameCourseCate}]}).toArray();

    return result;
}
async function viewAll(collectionName) {
    const dbo = await getDBO();
    const result = await dbo.collection(collectionName).find({}).toArray();
    return result;
}
async function getData(collectionName) {
    const dbo = await getDBO();
    const result = await dbo.collection(collectionName).find({}).toArray();
    return result;
}

async function searchAssign(collectionName, nameCourseAssign) {
    const dbo = await getDBO();
    

    const result = await dbo.collection(collectionName).find({

        $or: [{ name1: new RegExp(nameCourseAssign, 'i') }]
    }).toArray();

    return result;
}


/* (END) Staff Role */


module.exports = {
    createTraineeAccount,
    viewAllTraineeAccount,
    deleteFunction,
    updateFunction,
    doUpdateFunction,
    searchTraineeAccount,
    insertFunction,
    searchCourseCategory,
    viewAll,
    checkUser,
    getData,
    getTraineeName,
    getTrainerName,
    emailFinding,
    searchAssign,
    viewAllTrainerAccount,
    viewAllStaffAccount,
    createStaffAccount,
    searchStaffAccount,
    createTrainerAccount,
    searchTrainerAccount,
    searchTrainerCourse,
    checkExistEmail,
    updateFunctionTrainer,
    checkExistCourse,
    checkExistCourseCate,
    searchCourse,
    viewProfile
}