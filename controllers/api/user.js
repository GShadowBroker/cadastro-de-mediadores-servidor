const express = require("express");
const router = express.Router();
const { getContext } = require("../../utils/middleware");

router.get("/", getContext, async (req, res) => {
  if (!req.loggedUser) {
    return res.status(403).json({ error: "Usuário não autenticado" });
  }
  return res.status(200).json({ user: req.loggedUser });
});

module.exports = router;
