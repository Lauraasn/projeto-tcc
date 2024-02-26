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

    console.log("Tabelas Criadas");
};

createTables();