const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const projectsRouter = require("./projects/projects-router");
const actionsRouter = require("./actions/actions-router");

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

server.use("*", (req, res, next) => {
  res.json({
    message: "Fail",
  });
});

module.exports = server;
