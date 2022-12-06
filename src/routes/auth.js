const express = require("express");
const authControllers = require("../controllers/auth");
const { verifyToken } = require("../utils/verifyToken");

const router = express.Router();

router.use("/register", authControllers.register);
router.use("/login", authControllers.login);
router.use("/logout", verifyToken, authControllers.logout);

module.exports = router;
