module.exports = {
  port: process.env.port || 8000,
  host: process.env.host || "127.0.0.1",
  baseUrl: "http://127.0.0.1:8000",
  fromEmailAddress: process.env.FROM_EMAIL_ADDRESS,
  /* authExpiration: 1000 * 60 * 60 * 24 * 7, */
  authExpiration: 1000 * 60,
};
