const express = require("express");
const router = express.Router();
const authController = require("../controllers/authControllers");


router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/verify/:token", authController.verify);
router.get("/logout", authController.logout);
router.post("/forgot-password", authController.forgotPassword);
router.get("/reset-password/:token", authController.resetPassword);
router.post("/update-password", authController.updateNewPassword);
module.exports = router;
