const Joi = require("joi");

const formatMessage = (fieldName) => ({
  "string.base": `O campo '${fieldName}' é inválido`,
  "string.empty": `O campo '${fieldName}' não pode estar vazio`,
  "string.min": `O campo '${fieldName}' deve ter no mínimo {#limit} caractéres`,
  "string.max": `O campo '${fieldName}' deve ter no máximo {#limit} caractéres`,
  "any.required": `O campo '${fieldName}' é obrigatório`,
  "string.pattern.base": `O campo '${fieldName}' é inválido.`,
  "string.uri": `O campo '${fieldName}' não é um URI válido`,
  "string.email": `O campo '${fieldName}' deve ser um e-mail válido`,
});

const validateNewMediator = (body) => {
  const schema = Joi.object({
    fullname: Joi.string()
      .pattern(/^[A-zÀ-ú\s\'\-]+$/i)
      .min(4)
      .max(155)
      .required()
      .messages(formatMessage("fullname")),
    cpf: Joi.string().min(8).max(15).required().messages(formatMessage("cpf")),
    sex: Joi.any().valid("feminino", "masculino").required().messages({
      "string.base": `O campo 'sex' é inválido`,
      "string.empty": `O campo 'sex' não pode estar vazio`,
      "any.required": `O campo 'sex' é obrigatório`,
      "any.only": `O campo 'sex' apresenta valor diferente dos permitidos`,
    }),
    born: Joi.date().greater("01-01-1900").less("now").required().messages({
      "date.base": `O campo 'born' é inválido`,
      "date.greater": `O campo 'born' deve ser uma data posterior a 01-01-1900`,
      "date.less": `O campo 'born' deve ser uma data anterior a agora`,
      "any.required": `O campo 'born' é obrigatório`,
    }),
    certification: Joi.any()
      .valid("certificado", "em_formacao")
      .required()
      .messages({
        "string.base": `O campo 'certification' é inválido`,
        "string.empty": `O campo 'certification' não pode estar vazio`,
        "any.required": `O campo 'certification' é obrigatório`,
        "any.only": `O campo 'certification' apresenta valor diferente dos permitidos`,
      }),
    average_value: Joi.any()
      .valid("voluntario", "$", "$$", "$$$", "$$$$")
      .required()
      .messages({
        "string.base": `O campo 'average_value' é inválido`,
        "string.empty": `O campo 'average_value' não pode estar vazio`,
        "any.required": `O campo 'average_value' é obrigatório`,
        "any.only": `O campo 'average_value' apresenta valor diferente dos permitidos`,
      }),
    attachment: Joi.string().allow(null, ""),
    specialization: Joi.array()
      .items(
        Joi.string().valid("civel", "familia", "empresarial").min(1).required()
      )
      .required()
      .messages({
        "array.base": `O campo 'specialization' é inválido`,
        "array.empty": `O campo 'specialization' não pode estar vazio`,
        "array.required": `O campo 'specialization' é obrigatório`,
        "any.required": `O campo 'specialization' é obrigatório`,
        "array.includesRequiredUnknowns": `O campo 'specialization' deve conter pelo menos um valor válido`,
        "string.base": `Os valores do campo 'specialization' devem ser do tipo string`,
        "any.only": `Os valores do campo 'specialization' devem ser pelo menos um de ['civel', 'familia', 'empresarial']`,
      }),
    lattes: Joi.string()
      .pattern(
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/i
      )
      .max(1000)
      .required()
      .messages(formatMessage("lattes")),
    resume: Joi.string()
      .max(240)
      .allow(null, "")
      .messages(formatMessage("resume")),
    actuation_units: Joi.array()
      .items(Joi.string().min(1).required())
      .required()
      .messages({
        "array.base": `O campo 'actuation_units' é inválido`,
        "array.empty": `O campo 'actuation_units' não pode estar vazio`,
        "array.required": `O campo 'actuation_units' é obrigatório`,
        "any.required": `O campo 'actuation_units' é obrigatório`,
        "array.includesRequiredUnknowns": `O campo 'actuation_units' deve conter pelo menos um valor válido`,
        "string.base": `Os valores do campo 'actuation_units' devem ser do tipo string`,
      }),
    actuation_cities: Joi.array()
      .items(Joi.string().min(1).required())
      .required()
      .messages({
        "array.base": `O campo 'actuation_cities' é inválido`,
        "array.empty": `O campo 'actuation_cities' não pode estar vazio`,
        "array.required": `O campo 'actuation_cities' é obrigatório`,
        "any.required": `O campo 'actuation_cities' é obrigatório`,
        "array.includesRequiredUnknowns": `O campo 'actuation_cities' deve conter pelo menos um valor válido`,
        "string.base": `Os valores do campo 'actuation_cities' devem ser do tipo string`,
      }),
    email: Joi.string().email().required().messages(formatMessage("email")),
    alternative_email: Joi.string()
      .email()
      .allow(null, "")
      .messages(formatMessage("alternative_email")),
    phone: Joi.string()
      .min(8)
      .max(20)
      .allow(null, "")
      .messages(formatMessage("phone")),
    cellphone: Joi.string()
      .min(8)
      .max(20)
      .allow(null, "")
      .messages(formatMessage("cellphone")),
    password: Joi.string()
      .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
      .min(6)
      .max(55)
      .required()
      .messages(formatMessage("password")),
    acceptTerms: Joi.boolean().valid(true).required().messages({
      "boolean.base": `O valor para o campo 'acceptTerms' não é permitido`,
      "any.only": `'acceptTerms' deve ser 'true'`,
      "boolean.empty": `O campo 'acceptTerms' não pode estar vazio`,
      "boolean.required": `O campo 'acceptTerms' é obrigatório`,
      "any.required": `O campo 'acceptTerms' é obrigatório`,
    }),
    recaptchaValue: Joi.string()
      .max(2048)
      .required()
      .messages(formatMessage("recaptchaValue")),
  });

  return schema.validate(body, { abortEarly: false });
};

const validateNewCamara = (body) => {
  const schema = Joi.object({
    cnpj: Joi.string()
      .min(14)
      .max(22)
      .required()
      .messages(formatMessage("cnpj")),
    nome_fantasia: Joi.string()
      .pattern(/[A-zÀ-ú\s\'\-\/\!\.]+/i)
      .min(4)
      .max(155)
      .required()
      .messages(formatMessage("nome_fantasia")),
    razao_social: Joi.string()
      .pattern(/[A-zÀ-ú\s\'\-\/]+/i)
      .min(4)
      .max(155)
      .required()
      .messages(formatMessage("razao_social")),
    cpf_responsavel: Joi.string()
      .min(8)
      .max(15)
      .required()
      .messages(formatMessage("nome_fantasia")),
    estatuto: Joi.string().allow(null, ""),
    nada_consta: Joi.string().allow(null, ""),
    average_value: Joi.any()
      .valid("$", "$$", "$$$", "$$$$")
      .required()
      .messages({
        "string.base": `O campo 'average_value' é inválido`,
        "string.empty": `O campo 'average_value' não pode estar vazio`,
        "any.required": `O campo 'average_value' é obrigatório`,
        "any.only": `O campo 'average_value' apresenta valor diferente dos permitidos`,
      }),
    site: Joi.string()
      .pattern(
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/i
      )
      .max(1024)
      .required()
      .messages(formatMessage("site")),
    actuation_units: Joi.array()
      .items(Joi.string().min(1).required())
      .required()
      .messages({
        "array.base": `O campo 'actuation_units' é inválido`,
        "array.empty": `O campo 'actuation_units' não pode estar vazio`,
        "array.required": `O campo 'actuation_units' é obrigatório`,
        "any.required": `O campo 'actuation_units' é obrigatório`,
        "array.includesRequiredUnknowns": `O campo 'actuation_units' deve conter pelo menos um valor válido`,
        "string.base": `Os valores do campo 'actuation_units' devem ser do tipo string`,
      }),
    actuation_cities: Joi.array()
      .items(Joi.string().min(1).required())
      .required()
      .messages({
        "array.base": `O campo 'actuation_cities' é inválido`,
        "array.empty": `O campo 'actuation_cities' não pode estar vazio`,
        "array.required": `O campo 'actuation_cities' é obrigatório`,
        "any.required": `O campo 'actuation_cities' é obrigatório`,
        "array.includesRequiredUnknowns": `O campo 'actuation_cities' deve conter pelo menos um valor válido`,
        "string.base": `Os valores do campo 'actuation_cities' devem ser do tipo string`,
      }),
    cep: Joi.string()
      .min(8)
      .max(9)
      .pattern(/^\d{5}-?\d{3}$/)
      .required()
      .messages(formatMessage("cep")),
    address: Joi.string()
      .min(4)
      .max(155)
      .required()
      .messages(formatMessage("address")),
    complement: Joi.string()
      .max(155)
      .allow(null, "")
      .messages(formatMessage("complement")),
    number: Joi.number()
      .max(999999)
      .required()
      .messages(formatMessage("number")),
    district: Joi.string()
      .min(4)
      .max(155)
      .required()
      .messages(formatMessage("district")),
    email: Joi.string().email().required().messages(formatMessage("email")),
    alternative_email: Joi.string()
      .email()
      .allow(null, "")
      .messages(formatMessage("alternative_email")),
    phone: Joi.string()
      .min(8)
      .max(20)
      .allow(null, "")
      .messages(formatMessage("phone")),
    cellphone: Joi.string()
      .min(8)
      .max(20)
      .allow(null, "")
      .messages(formatMessage("cellphone")),
    password: Joi.string()
      .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
      .min(6)
      .max(55)
      .required()
      .messages(formatMessage("password")),
    acceptTerms: Joi.boolean().valid(true).required().messages({
      "boolean.base": `O valor para o campo 'acceptTerms' não é permitido`,
      "any.only": `'acceptTerms' deve ser 'true'`,
      "boolean.empty": `O campo 'acceptTerms' não pode estar vazio`,
      "boolean.required": `O campo 'acceptTerms' é obrigatório`,
      "any.required": `O campo 'acceptTerms' é obrigatório`,
    }),
    recaptchaValue: Joi.string()
      .max(2048)
      .required()
      .messages(formatMessage("recaptchaValue")),
  });

  return schema.validate(body, { abortEarly: false });
};

const validateEmail = (body) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages(formatMessage("email")),
  });
  return schema.validate(body);
};

const validatePasswordReset = (body) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages(formatMessage("email")),
    password: Joi.string()
      .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
      .min(6)
      .max(55)
      .required()
      .messages(formatMessage("password")),
    code: Joi.number().integer().positive().max(99999).required().messages({
      "number.base": "Código de segurança obrigatório",
      "number.infinity": "Código de segurança inválido",
      "number.max": "Código de segurança inválido",
      "any.required": "O código de segurança é obrigatório",
    }),
  });

  return schema.validate(body, { abortEarly: false });
};

module.exports = {
  validateNewMediator,
  validateNewCamara,
  validatePasswordReset,
  validateEmail,
};
