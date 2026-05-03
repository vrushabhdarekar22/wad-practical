const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

router.get("/all", employeeController.listAll);
router.post("/add", employeeController.addEmployee);
router.post("/update", employeeController.updateEmployee);
router.post("/delete", employeeController.deleteEmployee);

module.exports = router;
