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
        nome_fantasia: "Camara Privada de Mediação",
        razao_social: "Camara Privada de Mediação/SA",
        cpf_responsavel: cpf.format(cpf.generate()),
        estatuto: "meu_estatuto_final_final_changed_final_agoravai.pdf",
        nada_consta: "nada_consta.pdf",
        average_value: ["$", "$$", "$$$", "$$$$"][
          Math.floor(Math.random() * 4)
        ],
        site: "https://www3.camaraprivadademediacao.de/quemsomosnos.php3",
        actuation_units: ["TJSC", "TJAL"],
        actuation_cities: ["São Paulo/SP", "Salvador/BA"],
        cep: "99999-999",
        address: "Rua Jão Emílio Padilha",
        complement: "across river behind mayo company",
        number: Math.floor(Math.random() * 100000),
        district: "Vila São Juninho",
        email: `camaraprivada_${Math.floor(Math.random() * 10000)}@gmail.com`,
        alternative_email: "",
        phone: "+55 67 99999 9999",
        cellphone: "",
        password:
          "$2b$12$EIaRr9/MthFdiNbWuhJ0Due2XdPKHpY0NZ21faKNetMMMFDl.4zSO",
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
