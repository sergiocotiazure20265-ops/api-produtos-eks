const express = require('express');
const sql = require('mssql');
const app = express();

app.use(express.json());

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: true
    }
};

app.get('/produtos', async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query('SELECT * FROM Produtos');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

app.post('/produtos', async (req, res) => {
    try {
        await sql.connect(config);
        await sql.query`INSERT INTO Produtos (Nome) VALUES (${req.body.nome})`;
        res.send("Produto inserido");
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

app.get('/health', (req, res) => {
    res.send("OK");
});

app.listen(3000, () => {
    console.log("API PRODUTOS rodando na porta 3000");
});