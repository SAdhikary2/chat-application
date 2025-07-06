const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });
    connection.on("error", (err) => {
      console.log("Error connecting to MongoDB", err);
    });
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
}

module.exports = connectDB;
