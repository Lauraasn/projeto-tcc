const express = require("express");
const pool = require('./db');
const { join } = require("node:path");
const schema = require('./schema');

const clientsRoutes = express.Router();
const filePath = join(__dirname, "schema.sql");

//Create
clientsRoutes.post("/clientes", async (req, res, next) => {
    //const values = [req.body.name, req.body.age, req.body.sex, req.body.diagnostic, req.body.observation];
    try{
        const results = await pool.query(`INSERT INTO clientes(nome, idade, sexo, diagnostico, observacao) 
                                          VALUES('Joana', 52, 'F', 'Gordura Localizada', '') 
                                          ON CONFLICT DO NOTHING`/*, values*/);
        res.json(results.rows);
        console.log("Novo cliente cadastrado com sucesso")
    } catch (error) {
        console.error('Encountered an error while executing the query:', error);
        throw error;
    }
});
//Read
clientsRoutes.get("/clientes", async (req, res, next) => {
    try {
        const results = await pool.query(`SELECT * FROM clientes`);
        res.json(results.rows);
        console.log("Clientes listados com sucesso");
    } catch (error) {
        console.error('Encountered an error while executing the query:', error);
        throw error;
    }
});
//Update
//Delete

module.exports = clientsRoutes;