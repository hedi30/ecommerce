const CardModel = require("../models/cardModel");
const { responseReture } = require("../utils/response");

class CardController {
  addToCard = async (req, res) => {
    const { productId, name, price, quantity, image, category } = req.body;

    try {
      let card = await CardModel.findOne({ user: req.user._id });

      if (!card) {
        card = new CardModel({
          user: req.user._id,
          items: [
            {
              productId,
              category,
              name,
              image,
              quantity,
              price,
            },
          ],
          totalAmount: quantity * price,
        });
      } else {
        const existingItem = card.items.find(
          (item) => item.productId === productId,
        );

        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          card.items.push({
            productId,
            name,
            image,
            quantity,
            price,
            category,
          });
        }

        card.totalAmount = card.items.reduce(
          (total, item) => total + item.quantity * item.price,
          0,
        );
      }

      await card.save();
      responseReture(res, 200, "Item added to card successfully", { card });
    } catch (error) {
      console.error("Error adding to card:", error);
      responseReture(res, 500, "Internal Server Error");
    }
  };

  getCard = async (req, res) => {
    try {
      const card = await CardModel.findOne({ user: req.user._id });
      if (!card) {
        return responseReture(res, 404, "Card not found");
      }
      responseReture(res, 200, { card });
    } catch (error) {
      responseReture(res, 500, "Internal Server Error");
    }
  };

  removeFromCard = async (req, res) => {
    const { productId } = req.params;

    try {
      const card = await CardModel.findOne({ user: req.user._id });
      if (!card) {
        return responseReture(res, 404, "Card not found");
      }

      card.items = card.items.filter((item) => item.productId !== productId);
      card.totalAmount = card.items.reduce(
        (total, item) => total + item.quantity * item.price,
        0,
      );

      await card.save();
      responseReture(res, 200, "Item removed from card successfully", { card });
    } catch (error) {
      responseReture(res, 500, "Internal Server Error");
    }
  };

  updateCardItem = async (req, res) => {
    const { productId } = req.params;
    const { quantity } = req.body;
    try {
      const card = await CardModel.findOne({ user: req.user._id });
      if (!card) {
        return responseReture(res, 404, "Card not found");
      }
      const item = card.items.find(
        (item) => item.productId.toString() === productId,
      );
      if (!item) {
        return responseReture(res, 404, "Item not found in card");
      }

      item.quantity = quantity;
      card.totalAmount = card.items.reduce(
        (total, item) => total + item.quantity * item.price,
        0,
      );
      await card.save();
      responseReture(res, 200, { card });
    } catch (error) {
      responseReture(res, 500, "Internal Server Error");
    }
  };

  clearCard = async (req, res) => {
    try {
      const card = await CardModel.findOne({ user: req.user._id });
      if (!card) {
        return responseReture(res, 404, "Card not found");
      }

      card.items = [];
      card.totalAmount = 0;
      await card.save();

      responseReture(res, 200, "Card cleared successfully", { card });
    } catch (error) {
      responseReture(res, 500, "Internal Server Error");
    }
  };
}

module.exports = new CardController();
