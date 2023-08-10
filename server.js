// const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
//
const User = require("./mentees/models/signUp.js");
//
const connectDB = require("./config/db");

// load config
dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();
app.use(express.json());
// console.log(bilkl);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.post("/signup", (req, res) => {
  console.log(req.data);
  const newMentee = new User({
    fullName: req.body.fullName,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });
  newMentee.save();
  return res.status(200).json({ msg: newMentee });
});
app.listen();

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("Server is running " + process.env.NODE_ENV));
