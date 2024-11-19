const jwt = require("jsonwebtoken");
module.exports.createToken = async (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};
