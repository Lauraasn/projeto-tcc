const express = require("express");
const pool = require('./db');
const { join } = require("node:path");
const schema = require('./schema');
const bcrypt = require('bcrypt');

const routes = express.Router();
//const filePath = join(__dirname, "schema.sql");

//Json que aparece no localhost:8080
routes.get("/", (req, res) => {
    res.json("Olá, aqui é o servidor!")
});

routes.post('/login', async (req, res) => {
    try {
        const { email, senha } = req.body;
        const result = await pool.query(`SELECT * FROM usuarios WHERE email = $1`, [email]);
        if (result.rows.length > 0) {
            const usuario = result.rows[0];
            const isMatch = await bcrypt.compare(senha, usuario.senha);
            if (isMatch) {
                res.status(200).json({ message: 'Login realizado com sucesso' });
            } else {
                res.status(401).json({ error: 'Email ou senha inválido (routes.js)' });
            }
        } else {
            res.status(401).json({ error: 'Email ou senha inválido (routes.js)' });
        }
    } catch (error) {
        console.error('Erro ao logar usuário:', error);
        res.status(500).json({ message: 'Erro no Servidor Interno' });
    }
});

routes.post('/cadastro', async (req, res) => {
    try {
        const { email, senha } = req.body;
        const senhaHash = await bcrypt.hash(senha, 10);
        const insertQuery = `
        INSERT INTO usuarios (email, senha)
        VALUES ($1, $2)
        RETURNING *;
        `;
        const values = [email, senhaHash];
        const result = await pool.query(insertQuery, values);
        res.status(201).json({ message: 'Cadastrado com sucesso (Server)', data: result.rows[0] });
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
        res.status(500).json({ message: 'Erro no Servidor Interno' });
    }
});

routes.get("/clientes/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.query(`SELECT * FROM clientes WHERE id = $1`, [id]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao coletar dados de um cliente do banco de dados:', error);
        res.status(500).json({ message: 'Erro no Servidor Interno' });
    }
});

//Update (PUT url/:id)
routes.put("/clientes/:id", async (req, res) => {
    const { id } = req.params;
    const { nome, idade, sexo, diagnostico, observacao } = req.body;
    try {
        const updateQuery = `
            UPDATE clientes
            SET nome = $1, idade = $2, sexo = $3, diagnostico = $4, observacao = $5
            WHERE id = $6
            RETURNING *;
            `;
        const values = [nome, idade, sexo, diagnostico, observacao, id];
        const result = await pool.query(updateQuery, values);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }
        res.json({ message: 'Atualizado com sucesso', data: result.rows[0] });
    } catch (error) {
        console.error('Erro ao atualizar dados do cliente:', error);
        res.status(500).json({ message: 'Erro no Servidor Interno' });
    }
});


//Delete (DELETE url/:id)
routes.delete("/clientes/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const deleteQuery = `DELETE FROM clientes WHERE id = $1`;
        await pool.query(deleteQuery, [id]);
        res.json({ message: 'Deletado com sucesso' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Erro no Servidor Interno' });
    }
})

module.exports = routes;