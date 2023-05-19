//CHAMANDO MODULO HTTP E DETERMINANDO PORTA PARA EXECUÇÃO
const http = require('http');
const port = 3000;

//CRIANDO NOVO SERVIDOR
const server = http.createServer((req,res)=>{
    res.statusCode = 200 // colocando status para quando estiver tudo correto
    res.setHeader('Content-Type','text/html'); // determinando que irá receber html na página
    res.end('<h1>Praticando modulo HTTP com HTML</h1>') // dados HTML;
})

//DETERMINANDO MENSAGEM PARA DIZER EM QUAL PORTA ESTÁ RODANDO E SE ESTÁ TUDO CERTO.
server.listen(port,()=>{
    console.log(`A aplicação está rodando na porta ${port}`)
});