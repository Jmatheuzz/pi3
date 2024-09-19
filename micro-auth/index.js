// app.js

const express = require('express');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

// Configuração do Express
const app = express();
app.use(bodyParser.json());

// Configuração do banco de dados Postgres
const pool = new Pool({
    user: 'dev',       // substitua pelo seu usuário do Postgres
    host: 'localhost',         // substitua pelo seu host, se diferente
    database: 'hired',      // substitua pelo seu banco de dados
    password: 'senhadev',      // substitua pela sua senha do Postgres
    port: 5432                 // a porta padrão do Postgres é 5432
});

// Chave secreta para assinar os tokens
const JWT_SECRET = 'sua_chave_secreta';

// Endpoint para autenticar usuário e retornar token JWT
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Consulta ao banco para pegar o hash da senha armazenada
        const result = await pool.query('SELECT user_id, password_hash FROM users WHERE email = $1', [email]);

        if (result.rows.length > 0) {
            const userId = result.rows[0].user_id;
            const hashedPassword = result.rows[0].password_hash;

            // Verifica se a senha fornecida bate com o hash armazenado
            const isMatch = await bcrypt.compare(password, hashedPassword);

            if (isMatch) {
                // Se a senha for válida, gera o token JWT
                const token = jwt.sign({ userId: userId }, JWT_SECRET, { expiresIn: '1h' });
                res.json({ token, userId });
            } else {
                res.status(401).json({ message: 'Email ou senha inválidos' });
            }
        } else {
            res.status(401).json({ message: 'Email ou senha inválidos' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro interno no servidor' });
    }
});

// Endpoint para validar o token e retornar o payload (id do usuário)
app.post('/verify', (req, res) => {
    const { token } = req.body;

    try {
        // Verifica se o token é válido
        const decoded = jwt.verify(token, JWT_SECRET);
        res.json({ id: decoded.id, valid: true });
    } catch (err) {
        res.status(401).json({ message: 'Token inválido ou expirado', valid: false });
    }
});

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
