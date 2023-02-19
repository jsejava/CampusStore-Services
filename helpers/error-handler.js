function errorHandler(err, req, res, next) {
  if (err) {
    // jwt authentification
    if (err.name === "UnauthorizedError")
      return res.status(500).json({ message: "The user is not authorized" });
  }
  if (err.name === "ValidationError") {
    // validation error
    return res.status(500).json({ message: err });
  }
  // default to 500 server error
  return res.status(500).json(err);
}

module.exports = errorHandler;
