const Student = require('../models/Student');

const renderTable = async (res,StudentData,message="")  =>{
    let html =`
    <h3>${message}</h3>
        <table border="1" style="width:100%; border-collapse:collapse">
            <tr>
                <th>Name</th>
                <th>Roll No</th>
                <th>WAD</th>
                <th>DSBDA</th>
                <th>CNS</th>
                <th>CC</th>
                <th>AI</th>
            </tr>
            ${StudentData.map((s) => 
                `<tr>
                    <td>${s.Name}</td>
                    <td>${s.Roll_no}</td>
                    <td>${s.WAD_Marks}</td>
                    <td>${s.DSBDA_Marks}</td>
                    <td>${s.CNS_Marks}</td>
                    <td>${s.CC_Marks}</td>
                    <td>${s.AI_Marks}</td>
                </tr>`
                
            ).join("")}

            </table>

            <a href="/">Go to dashboard</a>
            `;

    res.send(html);
}



exports.initDB = async (req,res) => {
    try{
        await Student.deleteMany({});
        const initial = [
            {Name:"name1",Roll_no:1,WAD_Marks:10,DSBDA_Marks:10,CNS_Marks:10,CC_Marks:10,AI_Marks:10},
            {Name:"name2",Roll_no:2,WAD_Marks:20,DSBDA_Marks:20,CNS_Marks:20,CC_Marks:20,AI_Marks:20},
            {Name:"name3",Roll_no:3,WAD_Marks:30,DSBDA_Marks:30,CNS_Marks:30,CC_Marks:30,AI_Marks:30},
            {Name:"name4",Roll_no:4,WAD_Marks:40,DSBDA_Marks:40,CNS_Marks:40,CC_Marks:40,AI_Marks:40},
        ]
        
        await Student.insertMany(initial);
        // const studentData = Student.find();
        return res.send(`Initailized database successfully <a href="/">Go to Dashboard</a>`);
        
    }catch(e){
        console.log(e);    
    }
}


exports.viewAll = async (req,res)=>{
    try{
        const studentData = await Student.find();

        renderTable(res,studentData,`Loaded ${studentData.length} students record`)

    }catch(e){
        console.error(e);
        
    }
}

exports.deleteRecord = async (req,res) => {
    try{
        const result = await Student.deleteOne({Roll_no:req.body.Roll_no});
        const studentData = await Student.find();
        if(result.deletedCount === 0){
            return res.send(`No record found <a href="/">Go to Dashboard</a>`);
        }

        renderTable(res,studentData,`Record deleted Successfully:Roll no ${req.body.Roll_no}`);
    }catch(e){
        console.log(e);    
    }
}

exports.updateRecord = async (req,res) => {
    try{

        const result = await Student.updateOne({
            Roll_no:req.body.Roll_no
        },
        {$inc:{
            WAD_Marks:10,
            DSBDA_Marks:10,
            CNS_Marks:10,
            CC_Marks:10,
            AI_Marks:10,
        }})


        const studentData = await Student.find();

        if(result.matchedCount === 0){
            return res.send('No record found <a href="/">Go to Dashboard</a>');
        }

        renderTable(res,studentData,`Increased Marks of Roll no:${req.body.Roll_no} by 10`);

    }catch(e){
        console.log(e);    
    }
}

exports.moreThan20InDSBDA = async (req,res) => {
    try{

        const students = await Student.find({
            DSBDA_Marks:{
                $gt:20
            }
        });


        if(students.length === 0){
           return res.send('No record found <a href="/">Go to Dashboard</a>');
        }

        renderTable(res,students,"Students With marks greater than 25 in DSBDA");


    }catch(e){
        console.log(e);    
    }
}

exports.moreThan25InAll = async (req,res) => {
    try{
        const students = await Student.find({
            WAD_Marks:{
                $gt:25
            },
            DSBDA_Marks:{
                $gt:25
            },
            CNS_Marks:{
                $gt:25
            },
            AI_Marks:{
                $gt:25
            },
            CC_Marks:{
                $gt:25
            },
        });

        if(students.length === 0){
            return res.send('No record found <a href="/">Go to Dashboard</a>');
        }

        renderTable(res,students,"Students With marks greater than 25 in All subjects");

    }catch(e){
        console.log(e);    
    }
}

exports.lessThan40InWadAi = async (req,res) => {
    try{

        const students = await Student.find({
            WAD_Marks:{
                $lt:40
            },
            AI_Marks:{
                $lt:40
            },
        });


        if(students.length === 0){
            return res.send('No record found <a href="/">Go to Dashboard</a>');
        }

        renderTable(res,students,"Students With marks less than 40 in WAD and AI");


    }catch(e){
        console.log(e);    
    }
}