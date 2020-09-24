const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  return res.json({ server_up: true });
});

module.exports = router;
