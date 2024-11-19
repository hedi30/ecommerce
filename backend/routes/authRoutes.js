const router = require("express").Router();
const authController = require("../controllers/authControllers.js");
router.post("/login", authController.login);
module.exports = router;
