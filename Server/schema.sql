CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255),
    idade INT,
    sexo VARCHAR(1),
    diagnostico VARCHAR(255),
    observacao VARCHAR(255)
);