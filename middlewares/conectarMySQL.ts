import mysql from 'mysql';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'usuario',
    password: 'senha',
    database: 'banco_de_dados',
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL: ', err);
        return;
    }
    console.log('Conectado ao MySQL');
});

process.on('SIGNIT', () => {
    connection.end();
    process.exit();
});

export default connection;