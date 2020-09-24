const errorHandler = (err, req, res, next) => {
  console.error(err.message);

  switch (err.name) {
    case "CastError":
      return res.status(400).json({ error: "Malformatted id" });
    case "ValidationError":
      return res.status(400).json({ error: err.message });
    case "JsonWebTokenError":
      return res.status(401).json({ error: "Invalid token" });
    default:
      return next(err);
  }
};

const unknownEndpoint = (req, res) => {
  res
    .status(404)
    .json({ error: "This endpoint does not exist or is unavailable" });
};

module.exports = {
  errorHandler,
  unknownEndpoint,
};
