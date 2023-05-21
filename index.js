const fs = require('fs');
const http = require('http');

const port = 3000;

const server = http.createServer((req, res) => {
  const urlInfo = require('url').parse(req.url, true);
  const text = urlInfo.query.text;


  if (!text) {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      return res.end();
    });

  } else {

    fs.writeFile('arquivo.txt', text, function(err) {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/txt' });
        res.write('Erro ao criar o arquivo PDF');
        return res.end();
      }

      const fileStream = fs.createReadStream('arquivo.txt');
      res.setHeader('Content-Disposition', 'attachment; filename=seuArquivo.txt');
      res.setHeader('Content-Type', 'text/txt');
      fileStream.pipe(res);
    });
  }
});

server.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
});
