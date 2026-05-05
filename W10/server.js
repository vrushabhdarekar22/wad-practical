const express = require("express");
const PORT = 3000;
const fs = require("fs");

const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));

const FILE = "task.json";


app.get('/tasks',(req,res) => {
    // console.log("I am here");
    
    let data = JSON.parse(fs.readFileSync(FILE,"utf-8"));
    res.json(data);
})


app.post('/add',(req,res) => {
    // console.log("I am here");
    let data = JSON.parse(fs.readFileSync(FILE,"utf-8"));
    data.push({text:req.body.text});
    fs.writeFileSync(FILE,JSON.stringify(data));
    res.send("added");
})

app.delete('/delete/:i',(req,res) => {
    // console.log("I am here");
    let data = JSON.parse(fs.readFileSync(FILE,"utf-8"));
    data.splice(req.params.i,1);
    fs.writeFileSync(FILE,JSON.stringify(data));
    res.send("deleted");
})


app.put('/update/:i',(req,res) => {
    let data = JSON.parse(fs.readFileSync(FILE,"utf-8"));
    // here .text is very important
    data[req.params.i].text = req.body.text;
    console.log("I am in update method");
    fs.writeFileSync(FILE,JSON.stringify(data));
    res.send("updated");
})


app.listen(PORT,()=>{
    console.log(`server started at http://localhost:${PORT}`);
})