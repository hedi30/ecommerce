const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const { responseReture } = require("../utils/response");
const { createToken } = require("../utils/tokenGenerator");
class authControllers {
  login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await UserModel.findOne({ email }).select("+password");
      console.log(user);
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          const token = await createToken({
            id: user.id,
            role: user.role,
          });
          res.cookie("token", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          });
          responseReture(res, 200, "Login Success");
        } else {
          responseReture(res, 400, "Invalid email or password");
        }
      } else {
        responseReture(res, 400, "Invalid email or password");
      }
    } catch (error) {
      responseReture(res, 500, "Internal Server Error");
    }
  };
}

module.exports = new authControllers();
