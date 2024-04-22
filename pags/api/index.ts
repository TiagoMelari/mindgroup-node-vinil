import express from 'express';
import connection from '../../middlewares/conectarMySQL';

const app = express();
const PORTA = 3001;

app.use((req, res, next) => {
    req.mysql = connection;
    next();
});

app.get('/', (req, res) => {
    res.send('Olá TypeScript');
});

app.listen(PORTA, () => {
    console.log('Servidor rodando  na porta: ', PORTA);
});
