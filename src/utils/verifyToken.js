const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.token;
  const refresh_token = req.cookies.refresh_token;
  if (token) {
    const access_token = token.spilit(" ")[1];
    jwt.verify(access_token, process.env.JWT_ACCESS_KEY, (err, user) => {
      if (err) {
        res.status(400).json({
          status: "ERR",
          message: "Token is not valid",
        });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(400).json({
      status: "ERR",
      message: "Your are not authenticated",
    });
  }
};

const verifyTokenUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(400).json({
        status: "ERR",
        message: "You are not allowed to do that",
      });
    }
  });
};

const verifyTokenAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(400).json({
        status: "ERR",
        message: "You are not allowed to do that",
      });
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenUser,
  verifyTokenAdmin,
};
