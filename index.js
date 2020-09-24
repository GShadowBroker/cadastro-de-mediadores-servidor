const app = require("./app");
const http = require("http");
const server = http.createServer(app);
const { port, host } = require("./config");

server.listen(port, () => console.log(`Listening on ${host}:${port}`));
