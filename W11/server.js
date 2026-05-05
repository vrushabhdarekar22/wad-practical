const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;
const FILE = "users.json";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/users", (req, res) => {
    let data = JSON.parse(fs.readFileSync(FILE, "utf-8"));
    res.json(data);
});

app.post("/register", (req, res) => {
    let data = JSON.parse(fs.readFileSync(FILE, "utf-8"));
    data.push(req.body);
    fs.writeFileSync(FILE, JSON.stringify(data));
    res.json({ status: "ok" });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
