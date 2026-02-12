const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5555;
const MIME = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.css': 'text/css',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  let file = req.url === '/' ? '/index.html' : req.url;
  file = path.join(__dirname, file.replace(/\?.*$/, ''));
  const ext = path.extname(file);
  const type = MIME[ext] || 'application/octet-stream';
  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': type });
    res.end(data);
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log('Quiz app: http://127.0.0.1:' + PORT);
});
