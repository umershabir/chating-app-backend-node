const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
// load config
dotenv.config({ path: "./config/config.env" });
connectDB();
const app = express();
app.listen();
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log("server is running " + process.env.NODE_ENV + " " + PORT)
);
