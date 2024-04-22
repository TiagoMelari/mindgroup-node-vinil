import express from 'express';
import connection from '../../middlewares/conectarMySQL';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/cadastro', async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        if (!email || email.length < 5 || !email.includes('@') || !email.includes('.')) {
            return res.status(400).json({ message: 'Email inválido!' });
        }

        if (!senha || senha.length < 4) {
            return res.status(400).json({ message: 'Senha inválida!' });
        }

        const query = `SELECT * FROM usuarios WHERE email = ?`;
        connection.query(query, [email], async (error, reposta) => {
            if (error) {
                return res.status(500).json({ message: 'Erro ao consultar o banco de dados!' });
            }

            if (reposta.length > 0) {
                return res.status(400).json({ message: 'Já existe uma usuário com o email informado.' });
            }

        const senhaCriptografada = await bcrypt.hash(senha, 10);
        const inserirUsuarioQuery = `INSERT INTO usuarios(nome, email, senha) VALUES (?, ?, ?)`;
        connection.query(inserirUsuarioQuery, [nome, email, senhaCriptografada], (error, resultado) => {
            if (error) {
                return res.status(500).json({ message: 'Erro ao cadastrar usuário.' });
            }

            return res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
        });
        });
    } catch(e){
        console.log(e);
        return res.status(500).json({erro : 'Erro ao cadastrar usuario'});
    }
    
});