const { VerificationCode } = require("../models");
const logger = require("./logger");
const { Op } = require("sequelize");

module.exports = async () => {
  try {
    const deletedCodes = await VerificationCode.destroy({
      where: {
        createdAt: {
          [Op.lt]: Number(new Date()) - 1000 * 60 * 60 * 24, // one day old
        },
      },
    });
    logger.info("Códigos de verificação excluídos:", deletedCodes);
  } catch (err) {
    logger.error("Falha ao tentar excluir códigos de verificação expirados");
  }
};
