const express = require("express");
const router = express.Router();
const logger = require("../../../utils/logger");
const ApiError = require("../../../utils/ApiError");
const { Mediator, Camara, VerificationCode } = require("../../../models");
const bcrypt = require("bcrypt");
const crypto = require("crypto-random-string");
const {
  validateNewMediator,
  validateNewCamara,
} = require("../../../utils/validations");
const { sendConfirmationEmail } = require("../../../utils/emailService");
const rateLimit = require("express-rate-limit");
const getBase64Extension = require("../../../utils/getBase64Extension");

const endpointLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Excesso de solicitações de registro. Tente de novo mais tarde.",
});

router.post("/mediador", endpointLimiter, async (req, res, next) => {
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
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(value.password, salt);

    // Format attachments:
    let formatted_attachment = null;
    if (value.attachment) {
      const { mime, ext } = getBase64Extension(value.attachment);
      formatted_attachment = JSON.stringify({
        mime,
        ext,
        b64: value.attachment.replace(/^data:.+;base64,/, ""),
      });
    }
    // end

    const newMediator = await Mediator.create({
      ...value,
      attachment: formatted_attachment || null,
      password: hashedPassword,
      account_status: "pendente",
    });

    const verificationCode = await VerificationCode.create({
      email: newMediator.email,
      code: crypto({ length: 120, type: "url-safe" }),
      expires: new Date().getTime() + 1000 * 60 * 60 * 24,
    });

    sendConfirmationEmail(newMediator, verificationCode.code);

    return res.status(201).json({ id: newMediator.id });
  } catch (err) {
    return next(err);
  }
});

router.post("/camara", endpointLimiter, async (req, res, next) => {
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
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(value.password, salt);

    // Format attachments:
    let formatted_estatuto = null;
    if (value.estatuto) {
      const { mime, ext } = getBase64Extension(value.estatuto);
      formatted_estatuto = JSON.stringify({
        mime,
        ext,
        b64: value.estatuto.replace(/^data:.+;base64,/, ""),
      });
    }

    let formatted_nada_consta = null;
    if (value.nada_consta) {
      const { mime, ext } = getBase64Extension(value.nada_consta);
      formatted_nada_consta = JSON.stringify({
        mime,
        ext,
        b64: value.nada_consta.replace(/^data:.+;base64,/, ""),
      });
    }

    // end

    const newCamara = await Camara.create({
      ...value,
      estatuto: formatted_estatuto || null,
      nada_consta: formatted_nada_consta || null,
      password: hashedPassword,
      account_status: "pendente",
    });

    const verificationCode = await VerificationCode.create({
      email: newCamara.email,
      code: crypto({ length: 120, type: "url-safe" }),
      expires: new Date().getTime() + 1000 * 60 * 60 * 24,
    });

    sendConfirmationEmail(newCamara, verificationCode.code);

    return res.status(201).json({ id: newCamara.id });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
