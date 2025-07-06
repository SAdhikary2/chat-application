const UserModel = require("../models/UserModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function checkPassword(request, response) {
  try {
    const { password, userId } = request.body;

    const user = await UserModel.findById(userId);
    const verifiedPassword = await bcryptjs.compare(password, user.password);

    if (!verifiedPassword) {
      return response.status(400).json({
        message: "Invalid password",
        error: true,
      });
    }

    const tokenData = {
      id: user._id,
      email: user.email,
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    const cookiesOptions = {
      http: true,
      secure: true,
    };

    return response.cookie("token", token, cookiesOptions).status(201).json({
      message: "Login Sucessfully !",
      token : token,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = checkPassword;
