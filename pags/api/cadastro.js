"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const conectarMySQL_1 = __importDefault(require("../../middlewares/conectarMySQL"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = express_1.default.Router();
router.post('/cadastro', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nome, email, senha } = req.body;
        if (!email || email.length < 5 || !email.includes('@') || !email.includes('.')) {
            return res.status(400).json({ message: 'Email inválido!' });
        }
        if (!senha || senha.length < 4) {
            return res.status(400).json({ message: 'Senha inválida!' });
        }
        const query = `SELECT * FROM usuarios WHERE email = ?`;
        conectarMySQL_1.default.query(query, [email], (error, reposta) => __awaiter(void 0, void 0, void 0, function* () {
            if (error) {
                return res.status(500).json({ message: 'Erro ao consultar o banco de dados!' });
            }
            if (reposta.length > 0) {
                return res.status(400).json({ message: 'Já existe uma usuário com o email informado.' });
            }
            const senhaCriptografada = yield bcrypt_1.default.hash(senha, 10);
            const inserirUsuarioQuery = `INSERT INTO usuarios(nome, email, senha) VALUES (?, ?, ?)`;
            conectarMySQL_1.default.query(inserirUsuarioQuery, [nome, email, senhaCriptografada], (error, resultado) => {
                if (error) {
                    return res.status(500).json({ message: 'Erro ao cadastrar usuário.' });
                }
                return res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
            });
        }));
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ erro: 'Erro ao cadastrar usuario' });
    }
}));
exports.default = router;
