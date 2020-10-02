const express = require("express");
const router = express.Router();
const { Mediator } = require("../../../models");

router.get("/", async (req, res, next) => {
  const { limit, offset } = req.query;

  try {
    const mediadores = await Mediator.findAndCountAll({
      where: {
        account_status: "regular",
      },
      attributes: [
        "id",
        "fullname",
        "specialization",
        "average_value",
        "actuation_cities",
        "actuation_units",
      ],
      limit: limit || 20,
      offset: offset || 0,
    });
    if (!mediadores) return next();
    return res.status(200).json(mediadores);
  } catch (err) {
    return next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    const mediador = await Mediator.findOne({
      where: {
        id,
        account_status: "regular",
      },
      attributes: { exclude: ["password"] },
    });
    if (!mediador || mediador.account_status !== "regular") {
      return res.status(404).json({ erro: "Perfil não encontrado" });
    }
    return res.status(200).json(mediador);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
