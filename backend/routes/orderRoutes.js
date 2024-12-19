const router = require("express").Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/create", authMiddleware, orderController.createOrder);

router.get("/my-orders", authMiddleware, orderController.getOrders);

module.exports = router;
