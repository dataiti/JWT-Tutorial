const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const refresh_tokens = [];

const register = async (req, res) => {
  try {
    const newUser = new User({
      ...req.body,
      password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
    });
    const response = await newUser.save();
    if (response) {
      res.status(200).json({
        status: "OK",
        message: "Successfully",
        data: response,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "ERR",
      message: error,
    });
  }
};

const login = async (req, res) => {
  try {
    const isUser = await User.findOne({ username: req.body.username });
    if (!isUser) {
      res.status(400).json({
        status: "ERR",
        message: "Incorect username",
      });
    }
    const isCorrectPassword = bcrypt.compareSync(
      req.body.password,
      isUser.password
    );
    if (!isCorrectPassword) {
      res.status(400).json({
        status: "ERR",
        message: "Incorrect password",
      });
    }
    if (isUser && isCorrectPassword) {
      const access_token = generateAccessToken(isUser);
      const refresh_token = generateRefreshToken(isUser);
      refresh_tokens.push(refresh_token);
      res.cookie("refresh_token", refresh_token, {
        httpOnly: true,
        path: "/",
        secure: false,
        sameSite: "strict",
      });
      const { password, isAdmin, ...others } = isUser._doc;
      res.status(200).json({
        status: "OK",
        message: "Successfully",
        data: { ...others, access_token, refresh_token },
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "ERR",
      message: error,
    });
  }
};

const logout = async (req, res) => {
  refresh_tokens = refresh_tokens.filter((token) => token !== req.body.token);
  res.clearCookie("refresh_token");
  res.status(200).json({
    status: "OK",
    message: "Logout is successfully",
  });
};

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, isAdmin: user.isAdmin },
    process.env.JWT_ACCESS_KEY,
    { expiresIn: "30s" }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_REFRESH_KEY,
    { expiresIn: "365d" }
  );
};

module.exports = {
  register,
  login,
  logout,
  generateAccessToken,
  generateRefreshToken,
};
