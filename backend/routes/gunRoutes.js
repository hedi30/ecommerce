const router = require("express").Router();
const Gun = require("../models/gunModel");

router.get("/", async (req, res) => {
  try {
    const guns = await Gun.find();
    res.status(200).json(guns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const gun = await Gun.findById(req.params.id);
    if (!gun) {
      return res.status(404).json({ message: "Gun not found" });
    }
    res.status(200).json(gun);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
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
});

router.put("/:id", async (req, res) => {
  try {
    const gun = await Gun.findById(req.params.id);
    if (!gun) {
      return res.status(404).json({ message: "Gun not found" });
    }

    gun.name = req.body.name || gun.name;
    gun.image = req.body.image || gun.image;
    gun.price = req.body.price || gun.price;
    gun.category = req.body.category || gun.category;

    const updatedGun = await gun.save();
    res.status(200).json(updatedGun);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const gun = await Gun.findById(req.params.id);
    if (!gun) {
      return res.status(404).json({ message: "Gun not found" });
    }
    await gun.remove();
    res.status(200).json({ message: "Gun deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
