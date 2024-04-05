const express = require('express');
const clientsRoutes = require("./routes");
const app = express();

app.post("/post", (req, res) => {
    console.log("Connected to React");
    res.redirect("/");
});

app.use(express.json());
app.use(clientsRoutes);

app.get("/health", (req, res) => {
    return res.json("up");
});

module.exports = app;