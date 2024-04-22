"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const conectarMySQL_1 = __importDefault(require("../../middlewares/conectarMySQL"));
const app = (0, express_1.default)();
const PORTA = 3001;
app.use((req, res, next) => {
    req.mysql = conectarMySQL_1.default;
    next();
});
app.get('/', (req, res) => {
    res.send('Olá TypeScript');
});
app.listen(PORTA, () => {
    console.log('Servidor rodando  na porta: ', PORTA);
});
