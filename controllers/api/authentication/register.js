const express = require("express");
const router = express.Router();

const {
  validateNewMediator,
  validateNewCamara,
} = require("../../../utils/validations");

router.post("/mediador", async (req, res) => {
  validateNewMediator(req.body);
  const {
    fullname,
    cpf,
    sex,
    born,
    certification,
    average_value,
    attachment,
    specialization,
    lattes,
    resume,
    actuation_units,
    actuation_cities,
    email,
    alternative_email,
    phone,
    cellphone,
    password,
    acceptTerms,
  } = req.body;

  return res.status(200).json(req.body);
});

router.post("/camara", async (req, res) => {
  const { email, password } = req.body;
  return res.status(200).json({ email, password });
});

module.exports = router;
