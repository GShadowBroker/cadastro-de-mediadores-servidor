"use strict";
const app = require("./app");
const logger = require("./utils/logger");
const http = require("http");
const server = http.createServer(app);
const { port, host } = require("./config");
const cron = require("node-cron");
const deleteExpiredCodes = require("./utils/deleteOldVerificationCodes");

cron.schedule("0 04 */2 * *", () => {
  deleteExpiredCodes();
});

server.listen(port, () => logger.info(`Listening on ${host}:${port}`));
