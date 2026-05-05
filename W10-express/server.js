const express = require('express');
const fs = require('fs');

const app = express();
// convert incoming json string into js object
app.use(express.json());

// Hey, see this folder named 'public'? If a request comes in for a file that exists in there, 
// just give it to them automatically. Don't make me write any code for it
app.use(express.static("public"));

// create this file mannualy there.
const FILE = "task.json"; //our database


/* GET */
app.get("/task", (req, res) => {
    let data = JSON.parse(fs.readFileSync(FILE, "utf-8"));
    res.json(data);
});

/* ADD */
app.post("/add", (req, res) => {
    let data = JSON.parse(fs.readFileSync(FILE, "utf-8"));
    data.push({ text: req.body.text });
    fs.writeFileSync(FILE, JSON.stringify(data));
    res.send("Added");
});

/* DELETE */
app.delete("/delete/:i", (req, res) => {
    let data = JSON.parse(fs.readFileSync(FILE, "utf-8"));
    data.splice(req.params.i, 1);
    fs.writeFileSync(FILE, JSON.stringify(data));
    res.send("Deleted");
});

/* UPDATE */
app.put("/update/:i", (req, res) => {
    let data = JSON.parse(fs.readFileSync(FILE, "utf-8"));
    data[req.params.i].text = req.body.text;
    fs.writeFileSync(FILE, JSON.stringify(data));
    res.send("Updated");
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});