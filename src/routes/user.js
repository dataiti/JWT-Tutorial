const express = require("express");
const userController = require("../controllers/user");
const { verifyTokenAdmin, verifyTokenUser } = require("../utils/verifyToken");

const router = express.Router();

router.post("/", verifyTokenAdmin, userController.createUser);
router.delete("/:id", verifyTokenUser, userController.deleteUser);
router.put("/:id", verifyTokenUser, userController.updateUser);
router.get("/:id", verifyTokenUser, userController.getUser);
router.get("/", verifyTokenAdmin, userController.getAllUser);

module.exports = router;
