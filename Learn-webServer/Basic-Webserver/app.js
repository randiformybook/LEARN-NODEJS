const http = require('http');
const fs = require('fs');
//const path = require('path');
const port = 3000;

const renderHTML = (path, res) => {
    fs.readFile(path,(err,data) =>{
        if(err){
            res.writeHead(404);
            res.write(`Error: File '${path}' not found`);
        }else{
            res.write(data);
        };
        res.end();
    });
}

http
    .createServer((req,res) => {
        res.writeHead(200,{
            'Content-Type': "text/html",
        });
        const url = req.url;
        if(url === '/contact'){
            renderHTML('/contact',(res));
        }
        else if(url === '/about'){
            renderHTML('./about.html',(res));
        }
        else{
            renderHTML('./index.html',(res));
        };
    })
    . listen(port,()=>{
        console.log(`Server is listening on port ${port}..`);
    })