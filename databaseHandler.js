var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://nguyenduyanh131201:duyanh12345678@cluster0.2cohm.mongodb.net/FPTTrainingSystem";
const dbName = "FPTTrainingSystem";

async function getDBO() {
    const client = await MongoClient.connect(url);
    const dbo = client.db(dbName);
    return dbo;
}

/* ======== Admin  Role ========*/

/* (END) Admin Role */



/* ======== Staff Role ========*/
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
    //     $or: [{ name: new RegExp(traineeNameAgeSearch, 'i') }, { age: traineeNameAgeSearch }]
    // }).toArray();
    const result = await dbo.collection(collectionName).find({
        $or: [{ name: traineeNameAgeSearch }, { age: traineeNameAgeSearch }]
    }).toArray();

    return result;
}

async function insertCourseCategory(collectionName, data){
    const dbo = await getDBO();
    await dbo.collection(collectionName).insertOne(data);

}
async function searchCourseCategory(collectionName,nameCourseCate){
    const dbo = await getDBO();
    const result = await dbo.collection(collectionName).find({name: nameCourseCate}).toArray();

    return result;
}
async function viewAll(collectionName) {
    const dbo = await getDBO();
    const result = await dbo.collection(collectionName).find({}).toArray();
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
    insertCourseCategory,
    searchCourseCategory,
    viewAll,
    
}