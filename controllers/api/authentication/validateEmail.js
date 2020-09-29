const express = require("express");
const router = express.Router();
const { Mediator, Camara, VerificationCode } = require("../../../models");

router.post("/mediador/:user_id/:verification_code", async (req, res, next) => {
  const { user_id, verification_code } = req.params;
  if (!user_id || !verification_code) {
    return res
      .status(400)
      .json({ error: "Solicitação mal formatada ou inválida" });
  }

  try {
    const mediator = await Mediator.findByPk(user_id, {
      attributes: ["id", "account_status", "email"],
    });
    if (!mediator) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    if (mediator.account_status !== "pendente") {
      return res
        .status(400)
        .json({ error: "O e-mail do usuário já está validado" });
    }

    const verificationCode = await VerificationCode.findOne({
      where: { email: mediator.email },
    });
    if (!verificationCode) {
      return res.status(400).json({ error: "O código de verificação expirou" });
    }
    if (
      new Date() - new Date(verificationCode.createdAt) >=
      1000 * 60 * 60 * 24
    ) {
      return res.status(400).json({ error: "O código de verificação expirou" });
    }

    await Mediator.update(
      { account_status: "regular" },
      { where: { id: mediator.id } }
    );

    await VerificationCode.destroy({ where: { email: mediator.email } });

    return res.status(200).json({ account_status: "regular" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
