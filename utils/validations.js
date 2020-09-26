const Joi = require("joi");

const validateNewMediator = (body) => {
  const schema = Joi.object({
    fullname: Joi.string()
      .pattern(/[a-zA-Z\s]+/i)
      .min(4)
      .max(155)
      .required(),
    cpf: Joi.string().min(8).max(15).required(),
    sex: Joi.any().valid("feminino", "masculino").required(),
    born: Joi.date().greater("01-01-1900").less("now").required(),
    certification: Joi.any().valid("certificado", "em_formacao").required(),
    average_value: Joi.any()
      .valid("voluntario", "$", "$$", "$$$", "$$$$")
      .required(),
    attachment: Joi.binary().required(),
    specialization: Joi.array()
      .items(Joi.string().valid("civel", "familia", "empresarial"))
      .required(),
    lattes: Joi.string().uri().max(1000).required(),
    resume: Joi.string().max(240).allow(null, ""),
    actuation_units: Joi.array().items(Joi.string()).required(),
    actuation_cities: Joi.array().items(Joi.string()).required(),
    email: Joi.string().email().required(),
    alternative_email: Joi.string().email().allow(null, ""),
    phone: Joi.string().min(8).max(20).allow(null, ""),
    cellphone: Joi.string().min(8).max(20).allow(null, ""),
    password: Joi.string()
      .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
      .min(6)
      .max(55)
      .required(),
    acceptTerms: Joi.boolean().valid(true).required(),
  });

  return schema.validate(body);
};

const validateNewCamara = (camara, contact, confirm) => {};

module.exports = {
  validateNewMediator,
  validateNewCamara,
};
