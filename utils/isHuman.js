const axios = require("axios");

module.exports = async (value) => {
  const response = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SERVER_KEY}&response=${value}`,
    {},
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
      },
    }
  );
  if (!response) return false;

  console.log("recaptcha response", response);
  return response.data && response.data.success;
};
