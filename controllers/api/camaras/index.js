const express = require("express");
const router = express.Router();
const { Camara } = require("../../../models");

router.get("/", async (req, res, next) => {
  const { limit, offset } = req.query;

  try {
    const camaras = await Camara.findAndCountAll({
      where: { account_status: "regular" },
      attributes: [
        "id",
        "nome_fantasia",
        "average_value",
        "actuation_cities",
        "actuation_units",
      ],
      limit,
      offset,
    });
    if (!camaras) return next();
    return res.status(200).json(camaras);
  } catch (err) {
    return next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    const camara = await Camara.findOne({
      where: {
        id,
        account_status: "regular",
      },
      attributes: { exclude: ["password"] },
    });
    if (!camara || camara.account_status !== "regular") {
      return res.status(404).json({ erro: "Perfil não encontrado" });
    }
    return res.status(200).json(camara);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
