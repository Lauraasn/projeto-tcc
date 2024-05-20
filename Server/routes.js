const express = require("express");
const pool = require('./db');
const { join } = require("node:path");
const schema = require('./schema');

const routes = express.Router();
//const filePath = join(__dirname, "schema.sql");

//Json que aparece no localhost:8080
routes.get("/", (req, res) => {
    res.json("Olá, aqui é o servidor!")
});

routes.post('/login', (req, res) => {
    //Login
});

routes.post('/cadastro', async (req, res) => {
    try {
        const {email, senha} = req.body;
        const insertQuery = `
        INSERT INTO usuarios (email, senha)
        VALUES ($1, $2)
        RETURNING *;
        `;
        const values = [email, senha];
        const result = await pool.query(insertQuery, values);
        res.status(201).json({ message: 'Cadastrado com sucesso (Server)', data: result.rows[0]});
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).json({ message: 'Erro no Servidor Interno' });
    }
});

//Create (POST url)
routes.post("/clientes", async (req, res) => {
    try{
        const { nome, idade, sexo, diagnostico, observacao} = req.body;
        const insertQuery = `
            INSERT INTO clientes (nome, idade, sexo, diagnostico, observacao)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;
        const values = [nome, idade, sexo, diagnostico, observacao];
        const result = await pool.query(insertQuery, values);
        res.status(201).json({ message: 'Dados enviados com sucesso (Servidor):', data: result.rows[0] });
    } catch (error) {
        console.error('Erro ao inserir dados:', error);
        res.status(500).json({ message: 'Erro no Servidor Interno' });
    }
});

//Read (GET url ou GET url/:id <-- pra ler um específico)
routes.get("/clientes", async (req, res) => {
    try {
        const { rows } = await pool.query(`SELECT * FROM clientes`);
        res.json(rows);
    } catch (error) {
        console.error('Erro ao coletar dados do banco de dados:', error);
        res.status(500).json({message: 'Erro no Servidor Interno'});
    }
});

//Update (PUT url/:id)
routes.get("/clientes/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.query(`SELECT * FROM clientes WHERE id = $1`, [id]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao coletar dados de um cliente do banco de dados:', error);
        res.status(500).json({message: 'Erro no Servidor Interno'});
    }
});
//Delete (DELETE url/:id)

module.exports = routes;