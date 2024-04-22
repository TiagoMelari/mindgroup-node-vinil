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
const loginRouter = express_1.default.Router();
loginRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, senha } = req.body;
    conectarMySQL_1.default.connect();
    const query = `SELECT * FROM usuarios WHERE email = ?`;
    conectarMySQL_1.default.query(query, [email], (error, resposta) => __awaiter(void 0, void 0, void 0, function* () {
        if (error) {
            res.status(500).json({ message: 'Erro ao consultar o banco de dados' });
            return;
        }
        if (resposta.length === 0) {
            res.status(401).json({ message: 'Credenciais inválidas.' });
            return;
        }
        const usuario = resposta[0];
        const senhaCorreta = yield bcrypt_1.default.compare(senha, usuario.senha);
        if (senhaCorreta) {
            res.status(200).json({ message: 'Login realizado com sucesso!' });
        }
        else {
            res.status(401).json({ message: 'Credenciais inválidas.' });
        }
    }));
    conectarMySQL_1.default.end();
}));
exports.default = loginRouter;
