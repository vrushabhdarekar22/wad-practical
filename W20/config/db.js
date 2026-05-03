const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/employee");
        console.log("MongoDb connected to employee database");
    } catch (err) {
        console.log(err);
    }
};

module.exports = connectDb;
