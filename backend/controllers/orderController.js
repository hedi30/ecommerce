const OrderModel = require("../models/orderModel.js");
const { responseReture } = require("../utils/response");

class OrderController {
  createOrder = async (req, res) => {
    const { items, totalAmount } = req.body;
    try {
      const newOrder = new OrderModel({
        user: req.user._id,
        items,
        totalAmount,
      });
      await newOrder.save();
      responseReture(res, 201, "Order created successfully", {
        order: newOrder,
      });
    } catch (error) {
      responseReture(res, 500, "Internal Server Error");
    }
  };

  getOrders = async (req, res) => {
    try {
      // Changed to find() to get all orders
      const orders = await OrderModel.find({ user: req.user._id }).sort({
        createdAt: -1,
      }); // Sort by newest first

      if (!orders || orders.length === 0) {
        return responseReture(res, 404, "No orders found");
      }

      console.log({ orders });
      responseReture(res, 200, { orders });
    } catch (error) {
      console.error("Get orders error:", error);
      responseReture(res, 500, "Internal Server Error");
    }
  };
}

module.exports = new OrderController();
