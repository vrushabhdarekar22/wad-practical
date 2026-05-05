const http = require("http");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 3000;


const server = http.createServer((req,res)=>{

    if(req.url === '/api/products'){
        console.log("Request comes in api");
        fs.readFile("products.json","utf-8",(err,data)=>{
            if(err){
                res.writeHead(500);
                res.end('Unable to fetch');
            }else{
                res.writeHead(200,{"Content-Type":"application/json"});
                res.end(data);
            }
        })
    }

    else if(req.url === '/' || req.url === '/index.html'){
        // console.log("Request comes in index");
        
        fs.readFile("./public/index.html",(err,data)=>{
            res.writeHead(200,{"Content-Type":"text/html"});
            res.end(data);
        })
    }

     else if(req.url === '/script.js'){
        fs.readFile("./public/script.js",(err,data)=>{
            res.writeHead(200,{"Content-Type":"text/javascript"});
            res.end(data);
        })
    }

    else if(req.url === '/style.css'){
        fs.readFile("./public/style.css",(err,data)=>{
            res.writeHead(200,{"Content-Type":"text/css"});
            res.end(data);
        })
    }

    else if(req.url === '/bootstrap.min.css'){
        fs.readFile('./public/bootstrap.min.css',(err,data)=>{
            res.writeHead(200,{"Content-Type":"text/css"});
            res.end(data);
        })
    }

    else if(req.url === '/bootstrap.bundle.min.js'){
        fs.readFile('./public/bootstrap.bundle.min.js',(err,data)=>{
            res.writeHead(200,{"Content-Type":"text/javascript"});
            res.end(data);
        })
    }

    else if(req.url.startsWith('/images/')){
        const filePath = path.join(__dirname,"public",req.url);

        const mimeType = {
            ".jpg":"image/jpeg",
            ".jpeg":"image/jpeg",
            ".png":"image/png"
        }

        fs.readFile(filePath,(err,data)=>{
            if(err){

            }else{
                const ext = path.extname(filePath); //imp syntax
                const contentType = mimeType[ext]

                res.writeHead(200,{"Content-Type":contentType});
                res.end(data);
            }

        })


    }
    else{
        res.writeHead(404);
        res.end('Not Found!');
    }

});


server.listen(PORT,()=>{
    console.log(`server started at http://localhost:${PORT}`);
});