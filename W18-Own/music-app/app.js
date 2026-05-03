const express = require("express");
const connectDb = require("./config/db.js")
const path = require('path');
const musicRoutes = require('./routes/musicRoutes.js')
const PORT = 3000;

const app = express();
connectDb();


// form data should be encode
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"public","index.html"));
})


// if request comes on music then use musicRoutes

app.use('/music',musicRoutes);

app.listen(PORT,()=>{
    console.log(`server started at http://localhost:${PORT}`);
})