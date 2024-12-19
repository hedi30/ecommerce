const { Schema, model } = require("mongoose");

const gunSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Handguns",
      "Rifles",
      "Shotguns",
      "Submachine Guns",
      "Assault Rifles",
      "Sniper Rifles",
      "Machine Guns",
      "Antique Firearms",
    ],
  },
});

module.exports = model("Gun", gunSchema);
