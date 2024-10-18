const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to db");
  } catch (err) {
    console.log("ERROR ON CONNECTION TO DB");
  }
};

module.exports = connectToDb;
