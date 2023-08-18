// const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("./helper/auth");
// models
const MenteesSignUpModal = require("./mentees/models/signUp.js");
//
const connectDB = require("./config/db");
// load config
dotenv.config({ path: "./config/config.env" });

connectDB();
const app = express();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use(express.json());
// console.log(bilkl);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.post("/signup", (req, res) => {
  // console.log(req);
  console.log(req.body);
  const newMentee = new MenteesSignUpModal({
    fullName: req.body.fullName,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });
  newMentee.save();
  return res.status(201).json({ message: "Account created successfully!" });
});
// login
app.post("/login", (req, res) => {
  console.log(req.body.email);
  MenteesSignUpModal.findOne({ email: req.body.email })
    .then((user) => {
      if (user.password !== req.body.password) {
        return res.status(400).send({
          message: "Password does not match",
          error,
        });
      }
      const token = jwt.sign(
        {
          userId: user._id,
          userEmail: user.email,
        },
        "RANDOM-TOKEN",
        { expiresIn: "24h" }
      );
      res.status(200).send({
        message: "Login Successfully",
        email: user.email,
        token,
      });
    })
    .catch((err) => {
      res.status(400).send({
        message: "email does not registered",
        err,
      });
    });
});
app.get("/free-endpoint", (req, res) => {
  res.json({ message: "you are free to access" });
});
app.get("/auth-endpoint", auth, (req, res) => {
  res.json({ message: "you are authorized to access me" });
});
app.listen();

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("Server is running " + process.env.NODE_ENV));
