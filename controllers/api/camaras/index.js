const express = require("express");
const router = express.Router();
const { Camara } = require("../../../models");
const { Op } = require("sequelize");
const courts = require("../../../utils/courts");

router.get("/", async (req, res, next) => {
  const {
    limit,
    offset,
    filterName,
    filterUnits,
    filterAverageValues,
    filterQualifications,
    filterCity,
  } = req.query;

  try {
    const camaras = await Camara.findAndCountAll({
      where: {
        account_status: "regular",
        nome_fantasia: {
          [Op.iLike]: filterName ? `%${filterName}%` : "%%",
        },
        actuation_units: filterUnits
          ? {
              [Op.contains]: filterUnits.split(","),
            }
          : { [Op.ne]: null },
        average_value: filterAverageValues
          ? {
              [Op.or]: filterAverageValues.split(","),
            }
          : { [Op.ne]: null },
        actuation_cities: filterCity
          ? {
              [Op.contains]: [filterCity],
            }
          : { [Op.ne]: null },
      },
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
      attributes: { exclude: ["password", "estatuto", "nada_consta"] },
    });
    if (!camara || camara.account_status !== "regular") {
      return res.status(404).json({ erro: "Perfil não encontrado" });
    }
    return res.status(200).json(camara);
  } catch (err) {
    return next(err);
  }
});

const fs = require("fs");

router.get("/:id/visualizar_estatuto", async (req, res, next) => {
  const id = req.params.id;

  try {
    const camara = await Camara.findOne({
      where: {
        id,
        account_status: "regular",
      },
      attributes: ["id", "account_status", "estatuto"],
    });
    if (!camara || camara.account_status !== "regular") {
      return res.status(404).json({ erro: "Perfil não encontrado" });
    }
    if (!camara.estatuto) {
      return res.status(404).json({ erro: "Estatuto não encontrado" });
    }

    let decodedJson;
    if (typeof camara.estatuto === "string") {
      decodedJson = JSON.parse(camara.estatuto);
    } else {
      decodedJson = camara.estatuto;
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

router.get("/:id/visualizar_nada_consta", async (req, res, next) => {
  const id = req.params.id;

  try {
    const camara = await Camara.findOne({
      where: {
        id,
        account_status: "regular",
      },
      attributes: ["id", "account_status", "nada_consta"],
    });
    if (!camara || camara.account_status !== "regular") {
      return res.status(404).json({ erro: "Perfil não encontrado" });
    }
    if (!camara.nada_consta) {
      return res.status(404).json({ erro: "Nada consta não encontrado" });
    }

    let decodedJson;
    if (typeof camara.nada_consta === "string") {
      decodedJson = JSON.parse(camara.nada_consta);
    } else {
      decodedJson = camara.nada_consta;
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
