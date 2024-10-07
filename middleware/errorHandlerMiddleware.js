const errorHandlerMiddleware = (err, req, res, next) => {
    console.error(err.stack); // Log the error for debugging
    res.status(500).json({ message: err.message });
  };
  
  module.exports = errorHandlerMiddleware;
  