const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  if (email !== "gledyson@gmail.com") {
    return res.status(401).json({ erro: "senha ou e-mail incorretos" });
  }
  if (password !== "gledy123") {
    return res.status(401).json({ erro: "senha ou e-mail incorretos" });
  }
  return res
    .status(200)
    .cookie("sid", "atireiopaunogato", {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    })
    .json({ autenticado: true });
});

module.exports = router;
