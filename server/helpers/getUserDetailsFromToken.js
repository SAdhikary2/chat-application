const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

const getUserDetailsFromToken = async (token) => {
  if (!token) {
    return {
      message: "Session Out",
      logout: true,
    };
  }

  const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await UserModel.findById(decode.id).select('-password');
  return user;
};

module.exports = getUserDetailsFromToken;
