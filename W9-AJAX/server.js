const http = require("http");
const PORT = 3000;
const fs = require("fs");


const server = http.createServer((req,res) => {

    if(req.url === '/' || req.url === '/index.html'){
        fs.readFile("./public/index.html",(err,data) => {
            if(err){
                res.writeHead(500);
                res.end("Unable to load");
            }else{
                res.writeHead(200,{"Content-Type":"text/html"});
                // NOTE that you can`t use res.send() without express.you need to follow res.writeHead()+res.end();
                res.end(data);
            }
        })
    }

    else if(req.url === '/style.css'){
        fs.readFile('./public/style.css',(err,data) => {
            if(err){
                res.writeHead(500);
                res.end("Unable to load");
            }else{
                res.writeHead(200,{"Content-Type":"text/css"});
                res.end(data);
            }
        })
    }


    else if(req.url === '/script.js'){
        fs.readFile('./public/script.js',(err,data) => {
            if(err){
                res.writeHead(500);
                res.end("Unable to load");
            }else{
                res.writeHead(200,{"Content-Type":"text/javascript"});
                res.end(data);
            }
        })
    }

    else if(req.url === '/api/weather'){
        fs.readFile("weather.json","utf-8",(err,data) => {
            if(err){
                res.writeHead(500);
                res.end("Unable to load");
            }else{
                res.writeHead(200,{"Content-Type":"application/json"});
                res.end(data);
            }
        })
    }

    else{
        res.writeHead(404);
        res.end('Not Found!!');
    }
})

server.listen(PORT,() => {
    console.log(`server started at http://localhost:${PORT}`);
    
})