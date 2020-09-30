"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Mediators", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      fullname: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
        validate: {
          len: [4, 155],
        },
      },
      cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
        validate: { len: [11, 15] },
      },
      sex: {
        type: Sequelize.ENUM({ values: ["feminino", "masculino"] }),
        required: true,
        allowNull: false,
      },
      born: {
        type: Sequelize.DATEONLY,
      },
      certification: {
        type: Sequelize.ENUM({ values: ["certificado", "em_formacao"] }),
        required: true,
        allowNull: false,
      },
      average_value: {
        type: Sequelize.ENUM({
          values: ["voluntario", "$", "$$", "$$$", "$$$$"],
        }),
        allowNull: false,
        required: true,
        defaultValue: "voluntario",
      },
      attachment: {
        type: Sequelize.BLOB,
      },
      specialization: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: [],
        allowNull: false,
      },
      lattes: {
        type: Sequelize.STRING(1000),
        required: true,
        allowNull: false,
        validate: {
          isUrl: true,
          len: [8, 1000],
        },
      },
      resume: {
        type: Sequelize.STRING(240),
        required: false,
        allowNull: true,
        defaultValue: null,
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
    await queryInterface.dropTable("Mediators");
  },
};
