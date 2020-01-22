const express = require('express');

const accountRouter = require("./accounts/accountRouter");


const server = express();

server.use(express.json());

server.use("/api/accounts", accountRouter)

server.get("/", (req,res) => {
    return res.send("<h1>Server is Running on port 4000</h1>")
})

server.use((err,req,res,next) => {
    console.log(err);
    return res.status(500).json({error: "An error occured."})
})

module.exports = server;