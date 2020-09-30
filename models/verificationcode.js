"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class VerificationCode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  VerificationCode.init(
    {
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
      code: {
        type: DataTypes.STRING(2040),
        required: true,
        allowNull: false,
      },
      expires: {
        type: DataTypes.DATE,
        required: true,
        allowNull: false,
        defaultValue: new Date().getTime() + 1000 * 60 * 15,
      },
    },
    {
      sequelize,
      modelName: "VerificationCode",
    }
  );
  return VerificationCode;
};
