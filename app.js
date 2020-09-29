const express = require("express");
const app = express();
if (process.env.NODE_ENV !== "production") require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const middleware = require("./utils/middleware");

const indexRouter = require("./controllers");
const loginRouter = require("./controllers/api/authentication/login");
const registrationRouter = require("./controllers/api/authentication/register");
const accountVerificationRouter = require("./controllers/api/authentication/validateEmail");
const mediatorsRouter = require("./controllers/api/mediadores");
const camarasRouter = require("./controllers/api/camaras");
const testRouter = require("./controllers/api/test");

app.disable("x-powered-by");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

app.use("/", indexRouter);
app.use("/api/autenticacao/login", loginRouter);
app.use("/api/autenticacao/registrar", registrationRouter);
app.use("/api/autenticacao/validar_email", accountVerificationRouter);
app.use("/api/test", testRouter);
app.use("/api/mediadores", mediatorsRouter);
app.use("/api/camaras", camarasRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
