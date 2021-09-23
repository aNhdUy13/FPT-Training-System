var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://nguyenduyanh131201:duyanh12345678@cluster0.2cohm.mongodb.net/FPTTrainingSystem";
const dbName = "FPTTrainingSystem";

async function getDBO() {
    const client = await MongoClient.connect(url);
    const dbo = client.db(dbName);
    return dbo;
}


/* ======== Staff Role ========*/

/* (END) Staff Role */