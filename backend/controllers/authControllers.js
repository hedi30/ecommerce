const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const { responseReture } = require("../utils/response");
const { createToken } = require("../utils/tokenGenerator");
class authControllers {
  login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await UserModel.findOne({ email }).select("+password");
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          const token = await createToken({
            id: user._id,
            role: user.role,
          });
          res.cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
            path: "/",
          });
          responseReture(res, 201, {
            user: { id: user.id, name: user.name, role: user.role },
          });
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

  register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        responseReture(res, 400, "Email already in use");
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
          name,
          email,
          password: hashedPassword,
        });
        await newUser.save();
        const token = await createToken({
          id: newUser.id,
          role: newUser.role,
        });
        res.cookie("token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          path: "/",
        });
        responseReture(res, 201, {
          user: { id: newUser.id, name: newUser.name, role: newUser.role },
        });
      }
    } catch (error) {
      responseReture(res, 500, "Internal Server Error");
    }
  };

  logout = async (req, res) => {
    console.log("hello");
    res.clearCookie("token", {
      httpOnly: true,
      path: "/",
    });
    responseReture(res, 200, "Logged out successfully");
  };

  checkAuth = async (req, res) => {
    try {
      if (!req.user) {
        return responseReture(res, 401, "Not authenticated");
      }
      const user = await UserModel.findById(req.user.id);
      responseReture(res, 200, {
        user: { id: user.id, name: user.name, role: user.role },
      });
    } catch (error) {
      console.log(error);
      responseReture(res, 500, "Internal Server Error");
    }
  };
}

module.exports = new authControllers();
