const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;

// Create server
const server = http.createServer((req, res) => {

    // API route
    if (req.url === "/api/users") {
        fs.readFile("users.json", "utf-8", (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end("Error reading file");
            } else {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(data);
            }
        });
    }

    // Serve HTML file
    else if (req.url === "/" || req.url === "/index.html") {
        fs.readFile("./public/index.html", (err, data) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        });
    }

    // Serve JS file
    else if (req.url === "/script.js") {
        fs.readFile("./public/script.js", (err, data) => {
            res.writeHead(200, { "Content-Type": "text/javascript" });
            res.end(data);
        });
    }

    else if (req.url === "/style.css") {
        fs.readFile("./public/style.css", (err, data) => {
            res.writeHead(200, { "Content-Type": "text/css" });
            res.end(data);
        });
    }

    

    else {
        res.writeHead(404);
        res.end("Not Found");
    }
});


server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});