const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  return res
    .clearCookie("sid", {
      httpOnly: true,
      maxAge: authExpiration,
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .json({ success: true });
});

module.exports = router;
