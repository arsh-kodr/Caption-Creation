require("dotenv").config();
const app = require("./src/app");
const connectToDB = require("./src/db/db");

const PORT = process.env.PORT || 5000;

connectToDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(` Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(" Failed in Connecting to DB:", err.message);
    process.exit(1); 
  });
