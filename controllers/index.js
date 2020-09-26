const express = require("express");
const router = express.Router();
const { Mediator, Camara } = require("../models");
const logger = require("../utils/logger");

router.get("/", async (req, res, next) => {
  let mediadores;
  try {
    mediadores = await Mediator.findAndCountAll({
      attributes: ["id", "fullname"],
    });
  } catch (err) {
    return next(err);
  }
  let camaras;
  try {
    camaras = await Camara.findAndCountAll({
      attributes: ["id", "nome_fantasia"],
    });
  } catch (err) {
    return next(err);
  }
  if (!mediadores || !camaras) return next();
  console.log("mediadores", JSON.stringify(mediadores));
  return res.status(200).json({
    server_up: true,
    mediadores_cadastrados: mediadores.count,
    camaras_cadastradas: camaras.count,
  });
});

module.exports = router;
