const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, min: 6, max: 20, unique: true },
    email: { type: String, required: true, max: 50, unique: true },
    password: { type: String, required: true, min: 6 },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
