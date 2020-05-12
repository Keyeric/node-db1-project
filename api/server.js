const express = require("express");
const server = express();

const accRouter = require("../accounts/accountsRouter");

server.use(express.json());

server.use("/api/accounts", accRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Running</h2>`);
});

module.exports = server;
