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
//U
//D

module.exports = clientsRoutes;