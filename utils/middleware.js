const logger = require("./logger");
const { Mediator, Camara } = require("../models");
const jwt = require("jsonwebtoken");

const getContext = async (req, res, next) => {
  try {
    const token = req.headers.cookie && req.headers.cookie.substring(4);
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: "Token inválido ou ausente" });
    }

    if (decodedToken.account_type === "mediator") {
      const loggedUser = await Mediator.findByPk(decodedToken.id, {
        attributes: { exclude: ["password", "attachment"] },
      });
      req.loggedUser = loggedUser;
      return next();
    } else {
      const loggedUser = await Camara.findByPk(decodedToken.id, {
        attributes: { exclude: ["password", "estatuto", "nada_consta"] },
      });
      req.loggedUser = loggedUser;
      return next();
    }
  } catch (err) {
    return next(err);
  }
};

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);

  switch (err.name) {
    case "CastError":
      return res.status(400).json({ error: "id malformado" });
    case "ValidationError":
      return res.status(400).json({ error: err.message });
    case "JsonWebTokenError":
      return res.status(401).json({ error: "Token inválido ou ausente" });
    default:
      return next(err);
  }
};

const unknownEndpoint = (req, res) => {
  res
    .status(404)
    .json({ error: "Este endpoint não existe ou está indisponível" });
};

module.exports = {
  getContext,
  errorHandler,
  unknownEndpoint,
};
