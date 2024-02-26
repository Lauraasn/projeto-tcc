--Creates the table Clientes if it doesn't already exists
CREATE TABLE IF NOT EXISTS Clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    idade INT,
    sexo VARCHAR(1) NOT NULL,
    diagnostico VARCHAR(255),
    observacao VARCHAR(255)
);