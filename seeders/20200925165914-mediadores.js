"use strict";
const { v4: uuidv4 } = require("uuid");
const { cpf } = require("cpf-cnpj-validator");
const axios = require("axios");

module.exports = {
  up: async (queryInterface) => {
    const response = await axios.get("https://randomuser.me/api/?results=80");
    const randUsers = response.data.results;

    await queryInterface.bulkInsert(
      "Mediators",
      randUsers.map((user) => ({
        id: uuidv4(),
        cpf: cpf.format(cpf.generate()),
        fullname: `${user.name.first} ${user.name.last}`,
        sex: user.gender === "male" ? "masculino" : "feminino",
        born: user.dob.date.slice(0, 10),
        certification:
          Number(user.dob.age) % 2 === 0 ? "certificado" : "em_formacao",
        average_value:
          Number(user.dob.age) % 2 === 0
            ? ["$", "$$", "$$$", "$$$$"][Math.floor(Math.random() * 4)]
            : "voluntario",
        attachment: "not_a_virus.pdf",
        specialization: [
          ["civel"],
          ["civel", "familia"],
          ["civel", "familia", "empresarial"],
        ][Math.floor(Math.random() * 3)],
        lattes:
          "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4433275D9&tokenCaptchar=03AGdBq265iFHD4-2ert4f5U9LQO93ZkzSOA5yFay2ee8pryJB7Aofj05nkUlQ4musZdBEBV3BK1O1PlBE7B__jzz2ikQgr3Gy8iPMHpVyz5NKXZjZpfGW6Ie5-z8735a1qYBdt71lg_2feYlKxxUiA33RNtCwplzrMSOMljr6LD99FZs7qYXXuqAd3Ap5-wsUMT5WYcvfH3N9GI83cKOWia1MRyuuqFTZa8Q_a4BgNZsLHOcyVkOwzWutbmL7f30CcO5rs4dWJv_-2Njv8styTluZC2DE2PXUqw6xfn_R5wpysGCxmWIe2F0Dhw5HMRt9mi-s2K2F66vQMr2Pcs1bWBY6NlDxLzadTbfFK2pd4KRTdfs8Iik2aeDKbhmWHrCQr6NA4TE5ux5r_x16Hyzx6ugORmd40HUxvU5dw1_9VvWwlkn8q-aP0NVS0ZLkLC0-AI8EkI9qUJdJirEOgres15GBzfv2lZh56A",
        resume: "",
        actuation_units: [["TJMS"], ["TJSP", "TJRJ"], ["TJSC", "TJPR", "TJSP"]][
          Math.floor(Math.random() * 3)
        ],
        actuation_cities: [
          ["Dourados/MS"],
          ["São Paulo/SP", "Rio de Janeiro/RJ"],
          ["Florianópolis/SC", "Curitiba/PR", "Campinas/SP"],
        ][Math.floor(Math.random() * 3)],
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
    return queryInterface.bulkDelete("Mediators", null, {});
  },
};
