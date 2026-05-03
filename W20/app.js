const express = require("express");
const path = require("path");
const connectDb = require("./config/db.js");
const employeeRoutes = require("./routes/employeeRoutes.js");
const PORT = 3000;

const app = express();
connectDb();

// form data should be encode
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "index.html"));
});

// if request comes on employee then use employeeRoutes
app.use("/employee", employeeRoutes);

app.listen(PORT, () => {
	console.log(`server started at http://localhost:${PORT}`);
});
