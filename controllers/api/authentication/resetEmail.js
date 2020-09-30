const express = require("express");
const router = express.Router();
const { Mediator, Camara, VerificationCode } = require("../../../models");
const crypto = require("crypto-random-string");
const bcrypt = require("bcrypt");
const { sendResetPasswordKey } = require("../../../utils/emailService");
const rateLimit = require("express-rate-limit");
const ApiError = require("../../../utils/ApiError");
const {
  validateEmail,
  validatePasswordReset,
} = require("../../../utils/validations");

const endpointLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message:
    "Excesso de solicitações para resetar o e-mail. Tente de novo mais tarde.",
});

router.post("/mediador", endpointLimiter, async (req, res, next) => {
  const { error, value } = validateEmail(req.body);

  if (error) {
    return res.status(400).json({ error: error.details });
  }
  if (!value) {
    return res.status(500).json(new ApiError("Houve um erro inesperado").get());
  }

  const { email } = req.body;

  try {
    const mediator = await Mediator.findOne({
      where: { email, account_status: "regular" },
      attributes: ["id", "email"],
    });

    if (!mediator) {
      return res.status(404).json({
        error: "Usuário não encontrado ou e-mail pendente de validação",
      });
    }

    const existingCode = await VerificationCode.findOne({
      where: { email: mediator.email },
    });
    if (existingCode && existingCode.code.length === 5) {
      sendResetPasswordKey(mediator, existingCode.code);

      return res.status(200).json({ success: true });
    } else {
      const newCode = await VerificationCode.create({
        email: mediator.email,
        code: crypto({ length: 5, type: "numeric" }).toString(),
      });
      sendResetPasswordKey(mediator, newCode.code);

      return res.status(201).json({ success: true });
    }
  } catch (err) {
    return next(err);
  }
});

router.post("/camara", endpointLimiter, async (req, res, next) => {
  const { error, value } = validateEmail(req.body);

  if (error) {
    return res.status(400).json({ error: error.details });
  }
  if (!value) {
    return res.status(500).json(new ApiError("Houve um erro inesperado").get());
  }

  const { email } = req.body;

  try {
    const camara = await Camara.findOne({
      where: { email, account_status: "regular" },
      attributes: ["id", "email"],
    });

    if (!camara) {
      return res.status(404).json({
        error: "Usuário não encontrado ou e-mail pendente de validação",
      });
    }

    const existingCode = await VerificationCode.findOne({
      where: { email: camara.email },
    });
    if (existingCode && existingCode.code.length === 5) {
      sendResetPasswordKey(camara, existingCode.code);

      return res.status(200).json({ success: true });
    } else {
      const newCode = await VerificationCode.create({
        email: camara.email,
        code: crypto({ length: 5, type: "numeric" }).toString(),
      });
      sendResetPasswordKey(camara, newCode.code);

      return res.status(201).json({ success: true });
    }
  } catch (err) {
    return next(err);
  }
});

router.post("/submit_new_password", async (req, res, next) => {
  const { error, value } = validatePasswordReset(req.body);

  if (error) {
    return res.status(400).json({ error: error.details });
  }
  if (!value) {
    return res.status(500).json(new ApiError("Houve um erro inesperado").get());
  }

  const { email, password, code } = req.body;

  try {
    const existingCode = await VerificationCode.findOne({
      where: { email },
    });
    if (!existingCode) {
      return res
        .status(401)
        .json({ error: "Solicitação mal formatada ou inválida" });
    }
    if (existingCode.code !== code) {
      return res.status(401).json({ error: "Código de segurança inválido" });
    }

    let user = await Mediator.findOne({
      where: { email, account_status: "regular" },
      attributes: ["id", "email", "password"],
    });
    if (!user) {
      user = await Camara.findOne({
        where: { email, account_status: "regular" },
        attributes: ["id", "email", "password", "cnpj"],
      });
    }
    if (!user) {
      return res
        .status(401)
        .json({ error: "Solicitação mal formatada ou inválida" });
    }

    if (user.cnpj) {
      // If Camara
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);
      await Camara.update(
        { password: hashedPassword },
        { where: { email: user.email } }
      );
      await VerificationCode.destroy({ where: { email: user.email } });
      return res.status(200).json({ success: true });
    } else {
      // If Mediator
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);
      await Mediator.update(
        { password: hashedPassword },
        { where: { email: user.email } }
      );
      await VerificationCode.destroy({ where: { email: user.email } });
      return res.status(200).json({ success: true });
    }
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
