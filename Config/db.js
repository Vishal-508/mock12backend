const mongoose = require("mongoose");

const connectDb = async (DB_URL) => {
  try {
    await mongoose.connect(DB_URL);
    console.log("Connected to database");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDb;