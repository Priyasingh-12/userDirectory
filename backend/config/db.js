
const mongoose = require('mongoose');

const connectDB = async() => {

try {
       await mongoose.connect('mongodb://piyasngh12_db_user:admin1234@ac-crjsokh-shard-00-00.8gpuvml.mongodb.net:27017,ac-crjsokh-shard-00-01.8gpuvml.mongodb.net:27017,ac-crjsokh-shard-00-02.8gpuvml.mongodb.net:27017/?ssl=true&replicaSet=atlas-8yxrxj-shard-0&authSource=admin&appName=Cluster0')
         .then(()=> console.log(" MongoDb Database Connected "))
    
} catch (error) {
     console.log(error);
    process.exit(1);
}
};

module.exports = connectDB;


