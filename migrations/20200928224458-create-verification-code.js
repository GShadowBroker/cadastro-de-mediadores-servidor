"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("VerificationCodes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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
      code: {
        type: Sequelize.STRING(2040),
        required: true,
        allowNull: false,
      },
      expires: {
        type: Sequelize.DATE,
        required: true,
        allowNull: false,
        defaultValue: new Date().getTime() + 1000 * 60 * 15,
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
    await queryInterface.dropTable("VerificationCodes");
  },
};
