module.exports = {
  port: process.env.port || 8000,
  host: process.env.host || "127.0.0.1",
  baseUrl: process.env.BASE_URL || "http://127.0.0.1:8000",
  clientUrl: process.env.CLIENT_URL || "http://127.0.0.1:3000",
  fromEmailAddress: process.env.FROM_EMAIL_ADDRESS,
  authExpiration: 1000 * 60 * 60 * 24 * 7,
};
