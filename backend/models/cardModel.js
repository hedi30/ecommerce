const { Schema, model } = require("mongoose");

const cardSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      productId: String,
      name: String,
      image: String,
      quantity: {
        type: Number,
        default: 1,
      },
      category: String,
      price: Number,
    },
  ],
  totalAmount: {
    type: Number,
    default: 0,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Card", cardSchema);
