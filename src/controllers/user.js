const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

// CREATE USER
const createUser = async (req, res) => {
  try {
    const response = new User({
      ...req.body,
      password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
    });
    await response.save();
    res.status(200).json({
      status: "OK",
      message: "User has been created",
    });
  } catch (error) {
    res.status(500).json({
      status: "ERR",
      message: error,
    });
  }
};

// DELETE USER
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "OK",
      message: "User has been deleted",
    });
  } catch (error) {
    res.status(500).json({
      status: "ERR",
      message: error,
    });
  }
};

// UPDATE USER
const updateUser = async (req, res) => {
  try {
    const response = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (response) {
      res.status(200).json({
        status: "OK",
        message: "User has been updated",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "ERR",
      message: error,
    });
  }
};

// GET DETAIL USER
const getUser = async (req, res) => {
  try {
    const response = await User.findById(req.params.id);
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

// GET ALL USER
const getAllUser = async (req, res) => {
  try {
    const response = await User.find();
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

module.exports = {
  createUser,
  deleteUser,
  updateUser,
  getUser,
  getAllUser,
};
