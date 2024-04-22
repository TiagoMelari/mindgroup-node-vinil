import express from 'express';
import connection from '../../middlewares/conectarMySQL';

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, senha} = req.body;

    connection.connect();

    const query = `SELECT * FROM usuarios WHERE email = '${email}' AND senha = '${senha}'`;
    connection.query(query, (error, resposta) => {
        if (error) {
            res.status(500).json({ message: 'Erro ao consultar o banco de dados' });
        } else {
            if (resposta.length > 0) {
                res.status(200).json({ message: 'Login  realizado com sucesso!'});
            } else {
                res.status(401).json({ message: 'Credenciais inválidas.' });
            }
        }
    });

    connection.end();
});

export default router;