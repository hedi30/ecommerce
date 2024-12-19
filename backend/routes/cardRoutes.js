const router = require("express").Router();
const cardController = require("../controllers/cardController");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);

router.post("/add", authMiddleware, cardController.addToCard);
router.get("/", authMiddleware, cardController.getCard);
router.delete(
  "/item/:productId",
  authMiddleware,
  cardController.removeFromCard,
);
router.put("/item/:productId", authMiddleware, cardController.updateCardItem);
router.delete("/clear", authMiddleware, cardController.clearCard);

module.exports = router;
