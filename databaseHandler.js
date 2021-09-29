var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://nguyenduyanh131201:duyanh12345678@cluster0.2cohm.mongodb.net/FPTTrainingSystem";
const dbName = "FPTTrainingSystem";

async function getDBO() {
    const client = await MongoClient.connect(url);
    const dbo = client.db(dbName);
    return dbo;
}

/* Login  thang beo    */

    async function checkUser(nameIn,passwordIn){
    const dbo = await getDBO();
    const results = await dbo.collection("users").
        findOne({$and:[{email:nameIn},{password:passwordIn}]});

    if(results!=null)
        return true;
    else return false;
}
/* ======== Admin  Role ========*/

/* (END) Admin Role */



/* ======== Staff Role ========*/
// Duy anh
async function createTraineeAccount(collectionName, emailTrainee, passwordTrainee, nameTrainee,
    ageTrainee, DoBTrainee, educationTrainee) {

    const dbo = await getDBO();
    var newTraineeAccount = {
        email: emailTrainee,
        password: passwordTrainee,
        name: nameTrainee,
        age: ageTrainee,
        DoB: DoBTrainee,
        education: educationTrainee,
        role: "trainee"
    };

    await dbo.collection(collectionName).insertOne(newTraineeAccount);
}

async function viewAllTraineeAccount(collectionName) {
    const dbo = await getDBO();
    const result = await dbo.collection(collectionName).find({ role: 'trainee' }).toArray();

    return result;
}

async function deleteTraineeAccount(collectionName, Id) {
    const dbo = await getDBO();

    var ObectID = require('mongodb').ObjectID;
    // Lấy Id gửi về
    const condition = { "_id": ObectID(Id) };

    //console.log(notToDelete);
    await dbo.collection(collectionName).deleteOne(condition); //await đợi đến khi kết thúc
}

async function updateTraineeAccount(collectionName, Id) {
    const dbo = await getDBO();

    var ObectID = require('mongodb').ObjectID;
    // Lấy Id gửi về
    const condition = { "_id": ObectID(Id) };

    const traineeAccountToEdit = await dbo.collection(collectionName).findOne(condition);
    return traineeAccountToEdit;
}

async function doUpdateTraineeAccount(collectionName, Id, newValues) {
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
    //     $or: [{ name: new RegExp(traineeNameAgeSearch, 'i') }, { age: traineeNameAgeSearch }]
    // }).toArray();
    const result = await dbo.collection(collectionName).find({
        $or: [{ name: traineeNameAgeSearch }, { age: traineeNameAgeSearch }]
    }).toArray();

    return result;
}
// Duy Anh

// Hoang
async function insertCourseCategory(collectionName, data){
    const dbo = await getDBO();
    await dbo.collection(collectionName).insertOne(data);

}
async function searchCourseCategory(collectionName,nameCourseCate){
    const dbo = await getDBO();
    const result = await dbo.collection(collectionName).find({name: nameCourseCate}).toArray();

    return result;
}
async function viewAllCourseCategory(collectionName) {
    const dbo = await getDBO();
    const result = await dbo.collection(collectionName).find({}).toArray();
    return result;
}
async function deleteCourseCategory(collectionName,Id){
    const dbo = await getDBO();
    var ObectID = require('mongodb').ObjectID;

    const condition = { "_id": ObectID(Id) };

    await dbo.collection(collectionName).deleteOne(condition); 
}
async function updateCourseCategory(collectionName,Id){
    const dbo = await getDBO();

    var ObectID = require('mongodb').ObjectID;
    const condition = { "_id": ObectID(Id) };

    const DataToEdit = await dbo.collection(collectionName).findOne(condition);
    return DataToEdit;
}
async function doUpdateCourseCategory(collectionName, Id, newData) {
    const dbo = await getDBO();

    var ObectID = require('mongodb').ObjectID;

    const condition = { "_id": ObectID(Id) };

    await dbo.collection(collectionName).updateOne(condition, newData);

}

//Hoang
/* (END) Staff Role */


module.exports = {
    createTraineeAccount,
    viewAllTraineeAccount,
    deleteTraineeAccount,
    updateTraineeAccount,
    doUpdateTraineeAccount,
    searchTraineeAccount,
    insertCourseCategory,
    searchCourseCategory,
    viewAllCourseCategory,
    deleteCourseCategory,
    updateCourseCategory,
    doUpdateCourseCategory,
    checkUser
}