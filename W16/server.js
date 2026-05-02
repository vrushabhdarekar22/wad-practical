const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const server = http.createServer((req,res)=>{
    let filePath = path.join(__dirname,"public",(req.url === '/' ? 'index.html' : req.url));

    let ext = path.extname(filePath);

    const mimeType = {
        ".html":"text/html",
        ".css":"text/css",
        ".js":"text/javascript",
        ".png":"image/png",
        ".jpg":"image/jpeg",
        ".jpeg":"image/jpeg"
    }


    fs.readFile(filePath,(err,data)=>{

        
        if(err){
            res.writeHead(404);
            res.end("page not found");

        }else{
            res.writeHead(200,{"Content-Type":mimeType[ext] || "text/plain"});
            res.end(data);
        }
    })
});


server.listen(PORT,()=>{
    console.log(`server started at http://localhost:${PORT}`);
})
