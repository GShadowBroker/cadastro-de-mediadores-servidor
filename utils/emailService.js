const nodemailer = require("nodemailer");
const nodemailerSendgrid = require("nodemailer-sendgrid");
const logger = require("./logger");
const { baseUrl, fromEmailAddress } = require("../config");

const transport = nodemailer.createTransport(
  nodemailerSendgrid({
    apiKey: process.env.SENDGRID_API_KEY,
  })
);

const sendConfirmationEmail = async (user, code) => {
  if (!user || !code) {
    throw new Error("Usuário ou código de verificação inválidos");
  }
  const username = user.cnpj ? user.nome_fantasia : user.fullname;
  try {
    await transport.sendMail({
      from: fromEmailAddress,
      to: `${username} <${user.email}>`,
      subject: `Confirme sua conta no cadastro nacional de neutros`,
      html: `<div><h3>Por favor, clique no link abaixo para validar o seu e-mail.</h3><p><a href="${baseUrl}/validar-conta/mediador/${user.id}/${code}">${user.id}/${code}</a></p></div>`,
    });
    logger.info(`E-mail enviado com sucesso para ${user.email}`);
  } catch (err) {
    logger.error("Falha ao enviar o e-mail", err);
  }
};

const sendResetPasswordKey = async (user, code) => {
  if (!user || !code) {
    throw new Error("Usuário ou código de verificação inválidos");
  }
  const username = user.cnpj ? user.nome_fantasia : user.fullname;
  try {
    await transport.sendMail({
      from: fromEmailAddress,
      to: `${username} <${user.email}>`,
      subject: `Sua chave de segurança é ${code}`,
      html: `<div><h3>Para resetar a sua senha no cadastro nacional de neutros, use a chave de segurança a seguir:</h3><h1>${code}</h1></div>`,
    });
    logger.info(`E-mail enviado com sucesso para ${user.email}`);
  } catch (err) {
    logger.error("Falha ao enviar o e-mail", err);
  }
};

module.exports = {
  sendConfirmationEmail,
  sendResetPasswordKey,
};
