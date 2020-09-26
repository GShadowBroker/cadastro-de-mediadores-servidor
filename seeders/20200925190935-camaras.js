"use strict";
const { v4: uuidv4 } = require("uuid");
const { cpf, cnpj } = require("cpf-cnpj-validator");

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      "Camaras",
      Array.from(Array(20).keys()).map(() => ({
        id: uuidv4(),
        cnpj: cnpj.format(cnpj.generate()),
        nome_fantasia: "Maionese Boa",
        razao_social: "Maionese Boa SA",
        cpf_responsavel: cpf.format(cpf.generate()),
        estatuto: "meu_estatuto_final_final_changed_final_agoravai.pdf",
        nada_consta: "nada_consta.pdf",
        average_value: ["$", "$$", "$$$", "$$$$"][
          Math.floor(Math.random() * 4)
        ],
        site: "https://www3.yooohellothere.de/hello_world.php3",
        actuation_units: ["TJSC", "TJAL"],
        actuation_cities: ["São Paulo/SP", "Salvador/BA"],
        cep: "99999-999",
        address: "Rua Jão Emílio Padilha",
        complement: "across river behind mayo company",
        number: Math.floor(Math.random() * 100000),
        district: "Vila São Juninho",
        email: `gledysonferreira_${Math.floor(
          Math.random() * 10000
        )}@gmail.com`,
        alternative_email: "gledysonferreira@hotmail.com",
        phone: "+55 67 99999 9999",
        cellphone: "+55 67 99999 9999",
        password: "oi1234",
        account_status: "regular",
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      {}
    );
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete("Camaras", null, {});
  },
};
