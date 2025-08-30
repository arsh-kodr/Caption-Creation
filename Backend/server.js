require("dotenv").config();
const express = require("express");
const connectToDB = require("./src/db/db");
const app = require("./src/app");




const PORT = process.env.PORT || 8080;

connectToDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to DB:", err.message);
    process.exit(1);
  });
