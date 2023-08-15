const logger = (req, res, next) => {
  console.log("Petición recibida:", req.path);
  next();
};

module.exports = logger;
