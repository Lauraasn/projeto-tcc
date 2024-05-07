const pool = require('./db');

async function createTables(){
    await pool.connect();

    await pool.query(`CREATE TABLE IF NOT EXISTS Clientes (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        idade INT,
        sexo VARCHAR(1) NOT NULL,
        diagnostico VARCHAR(255),
        observacao VARCHAR(255)
    )`);

    await pool.query(`CREATE TABLE IF NOT EXISTS Usuarios (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        senha VARCHAR(255) NOT NULL
    )`);

    console.log("Tabelas Criadas");
};

createTables();