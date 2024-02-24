const express = require("express");

const allClients = [{ nome: "Alex", status: false}];
const clientsRoutes = express.Router();

//C
clientsRoutes.post("/clientes", (request, response) => {
    const {name} = request.body;
    allClients.push({name, status: false});
    return response.status(201).json(allClients);
});
//R
clientsRoutes.get("/clientes", (request, response) => {
    return response.status(200).json(allClients);
});
//U
//D

module.exports = clientsRoutes;