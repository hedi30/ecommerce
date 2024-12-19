const router = require("express").Router();
const authController = require("../controllers/authControllers.js");
const authMiddleware = require("../middleware/authMiddleware.js");
router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/logout", authMiddleware, authController.logout);
router.get("/check-auth", authMiddleware, authController.checkAuth);
module.exports = router;
