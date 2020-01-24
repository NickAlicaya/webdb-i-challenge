const express = require('express');

const db = require('./data/dbConfig.js');

const accountRouter = require("./accounts/accountRouter.js");


const server = express();

server.use(express.json());

server.use("/api/accounts", accountRouter)

server.get("/", (req,res) => {
    res.send("<h1>Server is Running on port 4000</h1>")
})

module.exports = server;