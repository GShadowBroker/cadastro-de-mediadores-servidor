const express = require("express");
const router = express.Router();
const { Mediator, Camara } = require("../../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authExpiration } = require("../../../config");
const rateLimit = require("express-rate-limit");
const { NONE } = require("sequelize");

const endpointLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Excesso de tentativas de login. Tente de novo mais tarde.",
});

router.post("/", endpointLimiter, async (req, res, next) => {
  const { email, password } = req.body;
  console.log("req.body", req.body);
  if (!email || !password) {
    return res.status(401).json({ error: "E-mail ou senha incorretos" });
  }

  try {
    let user = await Mediator.findOne({
      where: { email },
      attributes: ["id", "email", "password"],
    });
    if (!user) {
      user = await Camara.findOne({
        where: { email },
        attributes: ["id", "email", "password", "cnpj"],
      });
    }
    if (!user) {
      return res.status(401).json({ error: "E-mail ou senha incorretos" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "E-mail ou senha incorretos" });
    }

    const payload = {
      id: user.id,
      email: user.email,
      account_type: user.cnpj ? "camara" : "mediator",
    };

    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: authExpiration,
    });
    if (!token) {
      return res.status(500).json({ error: "Falha de autenticação" });
    }

    return res
      .status(200)
      .cookie("sid", token, {
        httpOnly: true,
        maxAge: authExpiration,
        secure: process.env.NODE_ENV === "production",
      })
      .json({ id: user.id, value: token });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
