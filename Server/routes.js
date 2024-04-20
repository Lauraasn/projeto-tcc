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

//Create (POST url)
routes.post("/clientes", async (req, res, next) => {
    //const values = [req.body.name, req.body.age, req.body.sex, req.body.diagnostic, req.body.observation];
    try{
        const results = await pool.query(`INSERT INTO clientes(nome, idade, sexo, diagnostico, observacao) 
                                          VALUES('Amadeu', 70, 'M', 'Parkinson', '') 
                                          ON CONFLICT DO NOTHING`/*, values*/);
        res.json(results.rows);
        console.log("Novo cliente cadastrado com sucesso")
    } catch (error) {
        console.error('Encountered an error while executing the query:', error);
        throw error;
    }
});
//Read (GET url ou GET url/:id <-- pra ler um específico)
routes.get("/clientes", async (req, res) => {
    try {
        const { rows } = await pool.query(`SELECT * FROM clientes`);
        res.json(rows);
    } catch (err) {
        console.error('Erro ao coletar dados do banco de dados:', err);
        res.status(500).json({error: 'Erro no Servidor Interno'});
    }
});
//Update (PUT url/:id)
//Delete (DELETE url/:id)

module.exports = routes;