const express = require("express");
const router = express.Router();
const { Mediator } = require("../../../models");
const { Op } = require("sequelize");
const courts = require("../../../utils/courts");

router.get("/", async (req, res, next) => {
  const { limit, offset, filterName, filterUnits } = req.query;

  try {
    const mediadores = await Mediator.findAndCountAll({
      where: {
        account_status: "regular",
        fullname: {
          [Op.iLike]: filterName ? `%${filterName}%` : "%%",
        },
        actuation_units: filterUnits
          ? {
              [Op.contains]: filterUnits.split(","),
            }
          : { [Op.ne]: null },
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
      attributes: { exclude: ["password", "attachment"] },
    });
    if (!mediador || mediador.account_status !== "regular") {
      return res.status(404).json({ erro: "Perfil não encontrado" });
    }
    return res.status(200).json(mediador);
  } catch (err) {
    return next(err);
  }
});

router.get("/:id/visualizar_anexo", async (req, res, next) => {
  const id = req.params.id;

  try {
    const mediator = await Mediator.findOne({
      where: {
        id,
        account_status: "regular",
      },
      attributes: ["id", "account_status", "attachment"],
    });
    if (!mediator || mediator.account_status !== "regular") {
      return res.status(404).json({ erro: "Perfil não encontrado" });
    }
    if (!mediator.attachment) {
      return res.status(404).json({ erro: "Anexo não encontrado" });
    }

    let decodedJson;
    if (typeof mediator.attachment === "string") {
      decodedJson = JSON.parse(mediator.attachment);
    } else {
      decodedJson = mediator.attachment;
    }

    const data = decodedJson.b64;
    const content = Buffer.from(data, "base64");

    res.writeHead(200, {
      "Content-Type": decodedJson.mime,
      "Content-Length": content.length,
    });
    return res.end(content);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
