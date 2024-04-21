import express from 'express';

const app = express();
const PORTA = 3001;

app.get('/', (req, res) => {
    res.send('Olá TypeScript');
});

app.listen(PORTA, () => {
    console.log('Servidor rodando  na porta: ', PORTA);
});