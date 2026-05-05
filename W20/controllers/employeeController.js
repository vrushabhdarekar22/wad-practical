const Employee = require('../models/Employee');

const renderTable = async (res, employees, message = "") => {
    let html = `
    <h3>${message}</h3>
    <table border="1" style="width:100%; border-collapse:collapse">
        <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Salary</th>
            <th>Joining Date</th>
        </tr>
        ${employees.map(e => {
            const dateText = e.joiningDate ? new Date(e.joiningDate).toISOString.slice(0, 10) : "";
            return `
            <tr>
                <td>${e.name}</td>
                <td>${e.department}</td>
                <td>${e.designation}</td>
                <td>${e.salary}</td> 
                <td>${dateText}</td>
            </tr>
            `;
        }).join("")}
    </table>
    </br>
    <hr>
    <a href="/">Go to Dashboard</a>
    `;

    res.send(html);
};

exports.listAll = async (req, res) => {
    try {
        const employees = await Employee.find();
        renderTable(res, employees, `Loaded ${employees.length} Employees`);
    } catch (err) {
        console.log(err);
    }
};

exports.addEmployee = async (req, res) => {
    try {
        await Employee.create({
            name: req.body.name,
            department: req.body.department,
            designation: req.body.designation,
            salary: Number(req.body.salary),
            joiningDate: req.body.joiningDate
        });

        const employees = await Employee.find();
        renderTable(res, employees, "Added employee");
    } catch (err) {
        console.log(err);
    }
};

exports.updateEmployee = async (req, res) => {
    try {
        const updates = {};
        if (req.body.department) updates.department = req.body.department;
        if (req.body.designation) updates.designation = req.body.designation;
        if (req.body.salary) updates.salary = Number(req.body.salary);
        if (req.body.joiningDate) updates.joiningDate = req.body.joiningDate;

        if (Object.keys(updates).length === 0) {
            res.send("No fields to update <a href='/'>Go to Dashboard</a>");
            return;
        }

        const result = await Employee.updateOne(
            { name: req.body.name },
            { $set: updates }
        );

        const employees = await Employee.find();
        if (result.matchedCount === 0) {
            renderTable(res, employees, "No employee matched");
            return;
        }

        renderTable(res, employees, `Updated employee: ${req.body.name}`);
    } catch (err) {
        console.log(err);
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        const name = req.body.name;
        const result = await Employee.deleteOne({ name });

        if (result.deletedCount === 0) {
            res.send(`No employee matched, name: ${name} <a href='/' >Go to Dashboard</a>`);
            return;
        }

        const employees = await Employee.find();
        renderTable(res, employees, `Deleted employee: ${name}`);
    } catch (err) {
        console.log(err);
    }
};
