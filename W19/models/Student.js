const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    Name:String,
    Roll_no:Number,
    WAD_Marks:Number,
    CC_Marks:Number,
    DSBDA_Marks:Number,
    CNS_Marks:Number,
    AI_Marks:Number,
});

const Student = mongoose.model('studentmarks',studentSchema);

module.exports = Student;