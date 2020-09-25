const express = require("express");
const app = express();
if (process.env.NODE_ENV !== "production") require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const middleware = require("./utils/middleware");

const indexRouter = require("./controllers");
const loginRouter = require("./controllers/api/login");
const registrationRouter = require("./controllers/api/register");
const testRouter = require("./controllers/api/test");

app.disable("x-powered-by");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

app.use("/", indexRouter);
app.use("/api/login", loginRouter);
app.use("/api/register", registrationRouter);
app.use("/api/test", testRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
