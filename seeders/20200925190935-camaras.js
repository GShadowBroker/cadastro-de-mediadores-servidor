"use strict";
const { v4: uuidv4 } = require("uuid");
const { cpf, cnpj } = require("cpf-cnpj-validator");
const axios = require("axios");

module.exports = {
  up: async (queryInterface) => {
    const response = await axios.get("https://randomuser.me/api/?results=80");
    const randUsers = response.data.results;

    await queryInterface.bulkInsert(
      "Camaras",
      randUsers.map((user) => ({
        id: uuidv4(),
        cnpj: cnpj.format(cnpj.generate()),
        nome_fantasia: `Camara de Mediação ${user.name.last}`,
        razao_social: `Camara de Mediação ${user.name.last}/SA`,
        cpf_responsavel: cpf.format(cpf.generate()),
        estatuto: "meu_estatuto_final_final_changed_final_agoravai.pdf",
        nada_consta: "nada_consta.pdf",
        average_value: ["$", "$$", "$$$", "$$$$"][
          Math.floor(Math.random() * 4)
        ],
        site: `https://www.camaraprivada${user.name.last}.com/`,
        actuation_units: [["TJMS"], ["TJSP", "TJRJ"], ["TJSC", "TJPR", "TJSP"]][
          Math.floor(Math.random() * 3)
        ],
        actuation_cities: [
          ["Dourados/MS"],
          ["São Paulo/SP", "Rio de Janeiro/RJ"],
          ["Florianópolis/SC", "Curitiba/PR", "Campinas/SP"],
        ][Math.floor(Math.random() * 3)],
        cep: "99999-999",
        address: `${user.location.street.name}, Saint Marie Square`,
        complement: "across river behind mayo company",
        number: user.location.street.number,
        district: `Vila São ${user.name.last}inho`,
        email: user.email,
        alternative_email: "",
        phone: user.phone,
        cellphone: user.cell,
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
