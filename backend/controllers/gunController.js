const Gun = require("../models/gunModel");
const { responseReture } = require("../utils/response");

class GunController {
  getGuns = async (req, res) => {
    try {
      const guns = await Gun.find();
      res.status(200).json(guns);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  getGunbyId = async (req, res) => {
    try {
      const gun = await Gun.findById(req.params.id);
      if (!gun) {
        return res.status(404).json({ message: "Gun not found" });
      }
      res.status(200).json(gun);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  addGun = async (req, res) => {
    const gun = new Gun({
      name: req.body.name,
      image: req.body.image,
      price: req.body.price,
      category: req.body.category,
    });

    try {
      const newGun = await gun.save();
      res.status(201).json(newGun);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
}

module.exports = new GunController();
