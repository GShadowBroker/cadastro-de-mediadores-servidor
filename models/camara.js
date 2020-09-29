"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Camara extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Camara.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      cnpj: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        validate: { len: [14, 22] },
      },
      nome_fantasia: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        validate: {
          len: [4, 155],
        },
      },
      razao_social: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        validate: {
          len: [4, 155],
        },
      },
      cpf_responsavel: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        validate: { len: [11, 15] },
      },
      estatuto: DataTypes.BLOB,
      nada_consta: DataTypes.BLOB,
      average_value: {
        type: DataTypes.ENUM({ values: ["$", "$$", "$$$", "$$$$"] }),
        allowNull: false,
        required: true,
      },
      site: {
        type: DataTypes.STRING(1000),
        validate: {
          isUrl: true,
        },
      },
      actuation_units: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
        allowNull: false,
      },
      actuation_cities: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
        allowNull: false,
      },
      cep: { type: DataTypes.STRING(9), allowNull: false, required: true },
      address: {
        type: DataTypes.STRING(155),
        required: true,
        allowNull: false,
      },
      complement: {
        type: DataTypes.STRING(155),
        required: false,
        allowNull: true,
      },
      number: { type: DataTypes.INTEGER, required: true, allowNull: false },
      district: {
        type: DataTypes.STRING(155),
        required: true,
        allowNull: false,
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
        defaultValue: "pendente",
      },
    },
    {
      sequelize,
      modelName: "Camara",
    }
  );
  return Camara;
};
