"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Camaras", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      cnpj: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
        validate: { len: [14, 22] },
      },
      nome_fantasia: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
        validate: {
          len: [4, 155],
        },
      },
      razao_social: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
        validate: {
          len: [4, 155],
        },
      },
      cpf_responsavel: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
        validate: { len: [11, 15] },
      },
      estatuto: {
        type: Sequelize.JSON,
      },
      nada_consta: {
        type: Sequelize.JSON,
      },
      average_value: {
        type: Sequelize.ENUM({ values: ["$", "$$", "$$$", "$$$$"] }),
        allowNull: false,
        required: true,
      },
      site: {
        type: Sequelize.STRING(1000),
        validate: {
          isUrl: true,
        },
      },
      actuation_units: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: [],
        allowNull: false,
      },
      actuation_cities: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: [],
        allowNull: false,
      },
      cep: {
        type: Sequelize.STRING(9),
        allowNull: false,
        required: true,
      },
      address: {
        type: Sequelize.STRING(155),
        required: true,
        allowNull: false,
      },
      complement: {
        type: Sequelize.STRING(155),
        required: false,
        allowNull: true,
      },
      number: {
        type: Sequelize.INTEGER,
        required: true,
        allowNull: false,
      },
      district: {
        type: Sequelize.STRING(155),
        required: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        required: true,
        validate: {
          isEmail: true,
          len: [5, 255],
        },
      },
      alternative_email: {
        type: Sequelize.STRING(255),
        allowNull: true,
        required: false,
      },
      phone: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      cellphone: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING,
        select: false,
      },
      account_status: {
        type: Sequelize.ENUM({ values: ["pendente", "regular", "suspenso"] }),
        required: true,
        allowNull: false,
        defaultValue: "pendente",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("Camaras");
  },
};
