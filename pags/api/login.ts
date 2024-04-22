import express from 'express';
import connection from '../../middlewares/conectarMySQL';
import bcrypt from 'bcrypt';

const loginRouter = express.Router();

loginRouter.post('/', async (req, res) => {
    const { email, senha} = req.body;

    connection.connect();

    const query = `SELECT * FROM usuarios WHERE email = ?`;
    connection.query(query, [email], async (error, resposta) => {
        if (error) {
            res.status(500).json({ message: 'Erro ao consultar o banco de dados' });
            return;
        }

        if (resposta.length === 0) {
                res.status(401).json({ message: 'Credenciais inválidas.' });
                return;
            }

        const usuario = resposta[0];
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (senhaCorreta) {
            res.status(200).json({ message: 'Login realizado com sucesso!' });
        } else {
            res.status(401).json({ message: 'Credenciais inválidas.' })
        }
    });

    connection.end();
});

export default loginRouter;