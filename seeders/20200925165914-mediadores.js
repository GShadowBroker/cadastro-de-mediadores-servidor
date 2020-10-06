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
        attachment: JSON.stringify({
          mime: "image/png",
          ext: "png",
          b64:
            "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",
        }),
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
