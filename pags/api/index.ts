import express from 'express';
import connection from '../../middlewares/conectarMySQL';

const app = express();
const PORTA = 3001;

app.use((req, res, next) => {
    console.log('Middleware executado');
    req.mysql = connection;
    next();
});

app.get('/', (req, res) => {
    console.log('Han?');
    res.send('Olá TypeScript');
});

app.listen(PORTA, () => {
    console.log('Servidor rodando  na porta: ', PORTA);
});
