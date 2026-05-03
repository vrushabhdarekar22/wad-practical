const express = require("express");
const connectDb = require("./config/db")
const path = require('path');
const studentRouter = require('./routes/studentRouter');
const PORT = 3000;


const app = express();
connectDb();

app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"public","index.html"));
})

app.use('/student',studentRouter);

app.listen(PORT,()=>{
    console.log(`server started at http://localhost:3000`);
})
