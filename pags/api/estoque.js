"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const conectarMySQL_1 = __importDefault(require("../../middlewares/conectarMySQL"));
const estoqueRouter = express_1.default.Router();
estoqueRouter.get('/', (req, res) => {
    const query = 'SELECT * FROM produtos';
    conectarMySQL_1.default.query(query, (error, resultados) => {
        if (error) {
            return res.status(500).json({ message: 'Erro ao consultar o banco de dados.' });
        }
        res.status(200).json(resultados);
    });
});
estoqueRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM produtos WHERE produto_id = ?';
    conectarMySQL_1.default.query(query, [id], (error, resultado) => {
        if (error) {
            return res.status(500).json({ message: 'Erro ao consultar o banco de dados.' });
        }
        if (resultado.length === 0) {
            return res.status(404).json({ message: 'Produto não encontrado.' });
        }
        res.status(200).json(resultado[0]);
    });
});
estoqueRouter.post('/', (req, res) => {
    const { nome, descricao, imagem, valor, qtd_estoque } = req.body;
    const valorFormatado = parseFloat(valor).toFixed(2);
    const valorFinal = parseFloat(valorFormatado);
    const query = 'INSERT INTO produtos (nome, descricao, imagem, valor, qtd_estoque) VALUES (?, ?, ?, ? ,?)';
    conectarMySQL_1.default.query(query, [nome, descricao, imagem, valorFinal, qtd_estoque], (error, resultado) => {
        if (error) {
            return res.status(500).json({ message: 'Erro ao cadastrar o produto!' });
        }
        res.status(201).json({ message: 'Produto cadastrado com sucesso!' });
    });
});
estoqueRouter.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nome, descricao, imagem, valor, qtd_estoque } = req.body;
    let camposAlterados = [];
    if (nome)
        camposAlterados.push('nome = ?');
    if (descricao)
        camposAlterados.push('descricao = ?');
    if (imagem)
        camposAlterados.push('imagem = ?');
    if (valor)
        camposAlterados.push('valor = ?');
    console.log(valor);
    if (qtd_estoque)
        camposAlterados.push('qtd_estoque = ?');
    console.log(camposAlterados);
    if (camposAlterados.length === 0) {
        return res.status(400).json({ message: 'Nenhum campo foi alterado.' });
    }
    const query = `UPDATE produtos SET ${camposAlterados.join(', ')} WHERE produto_id = ?`;
    const parametrosQuery = [];
    if (nome)
        parametrosQuery.push(nome);
    if (descricao)
        parametrosQuery.push(descricao);
    if (imagem)
        parametrosQuery.push(imagem);
    if (valor)
        parametrosQuery.push(parseFloat(valor).toFixed(2));
    if (qtd_estoque)
        parametrosQuery.push(qtd_estoque);
    parametrosQuery.push(id);
    conectarMySQL_1.default.query(query, parametrosQuery, (error, resultado) => {
        if (error) {
            console.log('Erro ao atualizar o produto:', error);
            return res.status(500).json({ message: 'Erro ao atualizar o produto!' });
        }
        console.log('Produto atualizado com sucesso', resultado);
        res.status(201).json({ message: 'Produto atualizado com sucesso!' });
    });
});
estoqueRouter.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM produtos WHERE produto_id = ?';
    conectarMySQL_1.default.query(query, [id], (error, resultado) => {
        if (error) {
            return res.status(500).json({ message: 'Erro ao excluir o produto!' });
        }
        res.status(201).json({ message: 'Produto excluído com sucesso!' });
    });
});
exports.default = estoqueRouter;
