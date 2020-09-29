const express = require("express");
const router = express.Router();
const logger = require("../../../utils/logger");
const ApiError = require("../../../utils/ApiError");
const { Mediator, Camara, VerificationCode } = require("../../../models");
const {
  validateNewMediator,
  validateNewCamara,
} = require("../../../utils/validations");
const bcrypt = require("bcrypt");
const {
  sendConfirmationEmailMediator,
} = require("../../../utils/emailService");
const crypto = require("crypto-random-string");

router.post("/mediador", async (req, res, next) => {
  const { error, value } = validateNewMediator(req.body);

  if (error) {
    return res.status(400).json({ error: error.details });
  }
  if (!value) {
    return res.status(500).json(new ApiError("Houve um erro inesperado").get());
  }

  const existingMediator = await Mediator.findOne({
    where: { email: value.email },
  });
  const existingCamara = await Camara.findOne({
    where: { email: value.email },
  });
  if (existingMediator || existingCamara) {
    return res
      .status(400)
      .json(
        new ApiError(
          "Já existe uma conta associada ao e-mail informado",
          "email"
        ).get()
      );
  }

  try {
    const saltCount = 12;
    const hashedPassword = await bcrypt.hash(value.password, saltCount);

    const newMediator = await Mediator.create({
      ...value,
      password: hashedPassword,
      account_status: "pendente",
    });

    const verificationCode = await VerificationCode.create({
      email: newMediator.email,
      code: crypto({ length: 120, type: "url-safe" }),
    });

    sendConfirmationEmailMediator(newMediator, verificationCode.code);

    return res.status(200).json({ id: newMediator.id });
  } catch (err) {
    return next(err);
  }
});

router.post("/camara", async (req, res) => {
  const { error, value } = validateNewCamara(req.body);

  if (error) {
    return res.status(400).json({ error: error.details });
  }
  if (!value) {
    return res.status(500).json(new ApiError("Houve um erro inesperado").get());
  }

  const existingMediator = await Mediator.findOne({
    where: { email: value.email },
  });
  const existingCamara = await Camara.findOne({
    where: { email: value.email },
  });
  if (existingMediator || existingCamara) {
    return res
      .status(400)
      .json(
        new ApiError(
          "Já existe uma conta associada ao e-mail informado",
          "email"
        ).get()
      );
  }

  try {
    const saltCount = 12;
    const hashedPassword = await bcrypt.hash(value.password, saltCount);

    const newCamara = await Camara.create({
      ...value,
      password: hashedPassword,
      account_status: "pendente",
    });
    return res.status(200).json({ id: newCamara.id });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
