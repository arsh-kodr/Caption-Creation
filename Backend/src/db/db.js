const mongoose = require("mongoose");

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to DB");
  } catch (error) {
    console.log("Error in connecting to DB", error);
    throw Error;
  }
}

module.exports = connectToDB;
