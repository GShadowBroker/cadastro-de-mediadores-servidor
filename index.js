"use strict";
const app = require("./app");
const logger = require("./utils/logger");
const http = require("http");
const server = http.createServer(app);
const { port, host } = require("./config");

server.listen(port, () => logger.info(`Listening on ${host}:${port}`));
