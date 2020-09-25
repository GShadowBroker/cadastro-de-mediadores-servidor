const express = require("express");
const router = express.Router();
const { Mediator } = require("../models");

router.get("/", async (req, res, next) => {
  let result;
  try {
    result = await Mediator.findAndCountAll();
  } catch (err) {
    return next(err);
  }
  if (!result) return next();
  return res
    .status(200)
    .json({ server_up: true, mediadores_cadastrados: result.count });
});

module.exports = router;
