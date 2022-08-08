const { errors: celebrateErrors } = require("celebrate");

function errorHandler(err, req, res, next) {
  const errorResponse = {
    success: false,
    message: error.status !== 500 ? errorMessage : "Internal server error",
  };
  res.status(error.status || 500).send(errorResponse);
}
exports.errorHandler = errorHandler;
