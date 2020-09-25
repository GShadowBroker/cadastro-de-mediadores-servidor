const express = require("express");
const router = express.Router();
const { Mediator, Camara } = require("../models");

router.get("/", async (req, res, next) => {
  let mediadores;
  try {
    mediadores = await Mediator.findAndCountAll();
  } catch (err) {
    return next(err);
  }
  let camaras;
  try {
    camaras = await Camara.findAndCountAll();
  } catch (err) {
    return next(err);
  }
  if (!mediadores || !camaras) return next();
  return res.status(200).json({
    server_up: true,
    mediadores_cadastrados: mediadores.count,
    camaras_cadastradas: camaras.count,
  });
});

module.exports = router;
