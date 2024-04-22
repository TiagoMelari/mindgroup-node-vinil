import express from 'express';
import connection from '../../middlewares/conectarMySQL';

const estoqueRouter = express.Router();

estoqueRouter.get('/', (req, res) => {
    const query = 'SELECT * FROM produtos';
    connection.query(query, (error, resultados) => {
        if (error) {
            return res.status(500).json({ message: 'Erro ao consultar o banco de dados.'})
        }
        res.status(200).json(resultados);
    });
});


estoqueRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM produtos WHERE produto_id = ?';
    connection.query(query, [id], (error, resultado) => {
        if (error) {
            return res.status(500).json({ message: 'Erro ao consultar o banco de dados.' });
        }
        if (resultado.length === 0) {
            return res.status(404).json({ message: 'Produto não encontrado.' });
        }
        res.status(200).json(resultado[0]);
    });
});


estoqueRouter.post('/' ,(req, res) => {
    const { nome, descricao, imagem, valor, qtd_estoque } = req.body;
    const valorFormatado = parseFloat(valor).toFixed(2);
    const valorFinal = parseFloat(valorFormatado);
    const query = 'INSERT INTO produtos (nome, descricao, imagem, valor, qtd_estoque) VALUES (?, ?, ?, ? ,?)';
    connection.query(query, [nome, descricao, imagem, valorFinal, qtd_estoque], (error, resultado) => {
        if (error) {
            return res.status(500).json({ message: 'Erro ao cadastrar o produto!'});
        }
        res.status(201).json({ message: 'Produto cadastrado com sucesso!'});        
    })
});

estoqueRouter.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nome, descricao, imagem, valor, qtd_estoque } = req.body;
    const valorFormatado = parseFloat(valor).toFixed(2);
    const valorFinal = parseFloat(valorFormatado);
    const query = 'UPDATE produtos SET nome = ?, descricao = ?, imagem = ?, valor = ?, qtd_estoque = ? WHERE produto_id = ?';
    connection.query(query, [nome, descricao, imagem, valorFinal, qtd_estoque, id], (error, resultado) => {
        if (error) {
            console.log('Erro ao atualizar o produto:', error)
            return res.status(500).json({ message: 'Erro ao atualizar o produto!'});
        }
        console.log('Produto atualizado com sucesso', resultado)
        res.status(201).json({ message: 'Produto atualizado com sucesso!'});        
    });
});

estoqueRouter.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM produtos WHERE produto_id = ?';
    connection.query(query, [id], (error, resultado) => {
        if (error) {
            return res.status(500).json({ message: 'Erro ao excluir o produto!'});
        }
        res.status(201).json({ message: 'Produto excluído com sucesso!'});
    })
});

export default estoqueRouter;
