
const http = require('http');
const fs = require('fs');    
const path = require('path'); 

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, 'public'); 

const server = http.createServer((req, res) => {
    let filePath;
    let contentType;

   
    if (req.url === '/') {
        filePath = path.join(PUBLIC_DIR, 'index.html');
        contentType = 'text/html';
    }
    
    else if (req.url === '/style.css') {
        filePath = path.join(PUBLIC_DIR, 'style.css');
        contentType = 'text/css';
    }
    else if (req.url === '/penguin.gif') {
        filePath = path.join(PUBLIC_DIR, 'penguin.gif');
        contentType = 'image/gif';
    }
    
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found\n');
        return; 
    }

    
    fs.readFile(filePath, (err, content) => {
        if (err) {
           
            
            console.error(`Erro ao ler arquivo ${filePath}:`, err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Erro interno do servidor\n');
        } else {
           
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

server.listen(PORT, () => {
    console.log(`Servidor de site rodando em http://localhost:${PORT}/`);
    console.log('Abra seu navegador e visite este endereço para ver o site.');
});