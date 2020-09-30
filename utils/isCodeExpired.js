const isCodeExpired = (code) => {
  if (!code || !code.expires) return true;
  const now = new Date();
  const expiration = new Date(code.expires);
  if (now < expiration) {
    return false;
  } else {
    return true;
  }
};

module.exports = isCodeExpired;
