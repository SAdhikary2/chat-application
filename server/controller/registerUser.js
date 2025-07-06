const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");

//Register User Controller
async function registerUser(request, response) {
  try {
    const { name, email, password, profile_pic } = request.body;
    const checkEmail = await UserModel.findOne({ email }); // Checking existing email

    if (checkEmail) {
      return response.status(400).json({
        message: "Email already exists",
        error: true,
      });
    }

    //Password Hashing
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const payload = {
      name,
      email,
      profile_pic,
      password: hashPassword,
    };

    const user = new UserModel(payload);
    const userSave = await user.save();

    return response.status(201).json({
      message: "User created successfully",
      data: userSave,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = registerUser;
