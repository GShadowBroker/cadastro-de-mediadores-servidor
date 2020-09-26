"use strict";
const { v4: uuidv4 } = require("uuid");
const { cpf } = require("cpf-cnpj-validator");

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      "Mediators",
      Array.from(Array(20).keys()).map(() => ({
        id: uuidv4(),
        cpf: cpf.format(cpf.generate()),
        fullname: "Gledyson Ferreira dos Santos",
        sex: "masculino",
        born: "1994-04-21",
        certification: "certificado",
        average_value: "voluntario",
        attachment: "not_a_virus.pdf",
        specialization: ["civel"],
        lattes:
          "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4433275D9&tokenCaptchar=03AGdBq265iFHD4-2ert4f5U9LQO93ZkzSOA5yFay2ee8pryJB7Aofj05nkUlQ4musZdBEBV3BK1O1PlBE7B__jzz2ikQgr3Gy8iPMHpVyz5NKXZjZpfGW6Ie5-z8735a1qYBdt71lg_2feYlKxxUiA33RNtCwplzrMSOMljr6LD99FZs7qYXXuqAd3Ap5-wsUMT5WYcvfH3N9GI83cKOWia1MRyuuqFTZa8Q_a4BgNZsLHOcyVkOwzWutbmL7f30CcO5rs4dWJv_-2Njv8styTluZC2DE2PXUqw6xfn_R5wpysGCxmWIe2F0Dhw5HMRt9mi-s2K2F66vQMr2Pcs1bWBY6NlDxLzadTbfFK2pd4KRTdfs8Iik2aeDKbhmWHrCQr6NA4TE5ux5r_x16Hyzx6ugORmd40HUxvU5dw1_9VvWwlkn8q-aP0NVS0ZLkLC0-AI8EkI9qUJdJirEOgres15GBzfv2lZh56A",
        resume: "",
        actuation_units: ["TJMS"],
        actuation_cities: ["Dourados/MS"],
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
    return queryInterface.bulkDelete("Mediators", null, {});
  },
};
