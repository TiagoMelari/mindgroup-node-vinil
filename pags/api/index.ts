import express from 'express';
import connection from '../../middlewares/conectarMySQL';
import estoqueRouter from './estoque';
import loginRouter from './login';
import cadastroRouter from './cadastro';

const app = express();
const PORTA = 3001;

app.use(express.json());
app.use((req, res, next) => {
    req.mysql = connection;
    next();
});

app.use('/cadastro', cadastroRouter);
app.use('/login', loginRouter);
app.use('/estoque', estoqueRouter);


app.get('/', (req, res) => {
    res.send('Olá TypeScript');
});

app.listen(PORTA, () => {
    console.log('Servidor rodando  na porta: ', PORTA);
});
