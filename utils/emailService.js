const nodemailer = require("nodemailer");
const nodemailerSendgrid = require("nodemailer-sendgrid");
const logger = require("./logger");
const { baseUrl } = require("../config");

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
      from: "gledysonferreira@gmail.com",
      to: `${user.fullname} <${user.email}>`,
      subject: "Confirme sua conta",
      html: `<h1>Clique <a href="${baseUrl}/validar-conta/${user.id}/${code}">aqui</a> para validar a sua conta.</h1>`,
    });
    logger.info("E-mail enviado com sucesso");
  } catch (err) {
    logger.error("Falha ao enviar o e-mail");
    logger.error(err);
  }
};

module.exports = {
  sendConfirmationEmailMediator,
};
