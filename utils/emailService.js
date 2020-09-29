const nodemailer = require("nodemailer");
const nodemailerSendgrid = require("nodemailer-sendgrid");
const logger = require("./logger");
const { baseUrl, fromEmailAddress } = require("../config");

const transport = nodemailer.createTransport(
  nodemailerSendgrid({
    apiKey: process.env.SENDGRID_API_KEY,
  })
);

const sendConfirmationEmailMediator = async (user, code) => {
  if (!user || !code) {
    throw new Error("Usuário ou código de verificação inválidos");
  }
  try {
    await transport.sendMail({
      from: fromEmailAddress,
      to: `${user.fullname} <${user.email}>`,
      subject: `Confirme sua conta no cadastro nacional de neutros`,
      html: `<div><h1>Por favor, clique no link abaixo para validar o seu e-mail.</h1><p><a href="${baseUrl}/validar-conta/mediador/${user.id}/${code}">${user.id}/${code}</a></p></div>`,
    });
    logger.info(`E-mail enviado com sucesso para ${user.email}`);
  } catch (err) {
    logger.error("Falha ao enviar o e-mail", err);
  }
};

const sendConfirmationEmailCamara = async (user, code) => {
  if (!user || !code) {
    throw new Error("Usuário ou código de verificação inválidos");
  }
  try {
    await transport.sendMail({
      from: fromEmailAddress,
      to: `${user.nome_fantasia} <${user.email}>`,
      subject: `Confirme sua conta no cadastro nacional de neutros`,
      html: `<div><h1>Por favor, clique no link abaixo para validar o seu e-mail.</h1><p><a href="${baseUrl}/validar-conta/camara/${user.id}/${code}">${user.id}/${code}</a></p></div>`,
    });
    logger.info(`E-mail enviado com sucesso para ${user.email}`);
  } catch (err) {
    logger.error("Falha ao enviar o e-mail", err);
  }
};

module.exports = {
  sendConfirmationEmailMediator,
  sendConfirmationEmailCamara,
};
