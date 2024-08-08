function errorHandler(error, req, res, next) {
  let status = error.status || 500;
  let message = error.message || `Server internal error`;
  switch (error.name) {
    case "invalid-token":
    case "JsonWebTokenError":
      status = 401;
      message = "UnAuthenticate";
      break;
    case "SequelizeUniqueConstraintError":
    case "SequelizeValidationError":
      status = 400;
      message = error.errors[0].message;
      break;
    case "not-found":
      status = 404;
      message = "Data not found";
      break;
    case `login-error`:
      status = 400;
      message = `Password is required`;
      break;
    case "login-failed":
      status = 401;
      message = `Email/Password is required`;
      break;
    case `login-wrong`:
      status = 400;
      message = `Email is required`;
      break;
    case "forbidden":
      status = 403;
      message = "UnAuthorize";
      break;
    case "already-add":
      status = 400;
      message = "Movie already added to favorites";
      break;
    case "no-email/password":
      status = 400;
      message = "email/password is required";
      break;
  }
  res.status(status).json({ message });
}
module.exports = errorHandler;
