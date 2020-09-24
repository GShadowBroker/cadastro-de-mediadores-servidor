const express = require("express");
const router = express.Router();

router.post("/", async (req, res, next) => {
  const { email, password } = req.body;
  return res.status(200).json({ email, password });
});

module.exports = router;
