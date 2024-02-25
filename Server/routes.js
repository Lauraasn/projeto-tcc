const express = require("express");
const pool = require('./db');

const allClients = [{ nome: "Alex", idade: 32, sexo: "M", diagnostico: "", observacao: ""}];
const clientsRoutes = express.Router();

//C
clientsRoutes.post("/clientes", (request, response) => {
    const {name, age, sex, diagnostic, observation} = request.body;
    allClients.push({name, age, sex, diagnostic, observation});
    return response.status(201).json(allClients);
});
//R
clientsRoutes.get("/clientes", (request, response) => {
    return response.status(200).json(allClients);
});
//U
//D

module.exports = clientsRoutes;