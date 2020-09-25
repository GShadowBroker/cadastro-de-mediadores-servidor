"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Mediator extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Mediator.init(
    {
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        validate: {
          len: [4, 155],
        },
      },
      cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        validate: { len: [11, 15] },
      },
      sex: {
        type: DataTypes.ENUM({ values: ["feminino", "masculino"] }),
        required: true,
        allowNull: false,
      },
      born: { type: DataTypes.DATEONLY },
      certification: {
        type: DataTypes.ENUM({ values: ["certificado", "em_formacao"] }),
        required: true,
        allowNull: false,
      },
      average_value: {
        type: DataTypes.ENUM({
          values: ["voluntario", "$", "$$", "$$$", "$$$$"],
        }),
        allowNull: false,
        required: true,
        defaultValue: "voluntario",
      },
      attachment: { type: DataTypes.BLOB },
      specialization: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
        allowNull: false,
        validate: {
          len: [0, 3],
        },
      },
      lattes: {
        type: DataTypes.STRING(1000),
        required: true,
        allowNull: false,
        validate: {
          isUrl: true,
          len: [8, 1000],
        },
      },
      resume: {
        type: DataTypes.STRING(240),
        required: false,
        allowNull: true,
        defaultValue: null,
      },
      actuation_units: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
        allowNull: false,
        validate: {
          len: [0, 28],
        },
      },
      actuation_cities: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
        allowNull: false,
        validate: {
          len: [0, 55],
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        required: true,
        validate: {
          isEmail: true,
          len: [5, 255],
        },
      },
      alternative_email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isEmail: true,
          len: [5, 255],
        },
      },
      phone: { type: DataTypes.STRING(20), allowNull: true },
      cellphone: { type: DataTypes.STRING(20), allowNull: true },
      password: { type: DataTypes.STRING, select: false },
      account_status: {
        type: DataTypes.ENUM({ values: ["pendente", "regular", "suspenso"] }),
        required: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Mediator",
    }
  );
  return Mediator;
};
