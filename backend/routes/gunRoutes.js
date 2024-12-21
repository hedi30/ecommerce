const router = require("express").Router();
const Gun = require("../models/gunModel");
const GunController = require("../controllers/gunController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
router.get("/", GunController.getGuns);

router.get("/:id", authMiddleware, GunController.getGunbyId);

router.post("/", adminMiddleware, GunController.addGun);

module.exports = router;
