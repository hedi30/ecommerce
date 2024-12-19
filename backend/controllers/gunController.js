const GunModel = require("../models/gunModel");
const { responseReture } = require("../utils/response");

class GunController {
  addGun = async (req, res) => {
    const { name, image, price, category } = req.body;

    try {
      const newGun = new GunModel({
        name,
        image,
        price,
        category,
      });

      await newGun.save();
      responseReture(res, 201, "Gun added successfully", { gun: newGun });
    } catch (error) {
      responseReture(res, 500, "Error adding gun");
    }
  };

  deleteGun = async (req, res) => {
    const { id } = req.params;

    try {
      const gun = await GunModel.findByIdAndDelete(id);
      if (!gun) {
        return responseReture(res, 404, "Gun not found");
      }
      responseReture(res, 200, "Gun deleted successfully");
    } catch (error) {
      responseReture(res, 500, "Error deleting gun");
    }
  };

  updateGun = async (req, res) => {
    const { id } = req.params;
    const { name, image, price, category } = req.body;

    try {
      const gun = await GunModel.findByIdAndUpdate(
        id,
        { name, image, price, category },
        { new: true },
      );

      if (!gun) {
        return responseReture(res, 404, "Gun not found");
      }

      responseReture(res, 200, "Gun updated successfully", { gun });
    } catch (error) {
      responseReture(res, 500, "Error updating gun");
    }
  };

  getAllGuns = async (req, res) => {
    try {
      const guns = await GunModel.find();
      responseReture(res, 200, "Guns retrieved successfully", { guns });
    } catch (error) {
      responseReture(res, 500, "Error retrieving guns");
    }
  };

  getGun = async (req, res) => {
    const { id } = req.params;

    try {
      const gun = await GunModel.findById(id);
      if (!gun) {
        return responseReture(res, 404, "Gun not found");
      }
      responseReture(res, 200, "Gun retrieved successfully", { gun });
    } catch (error) {
      responseReture(res, 500, "Error retrieving gun");
    }
  };
}

module.exports = new GunController();
