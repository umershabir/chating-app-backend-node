// const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("./helper/auth");
// models
const MenteesModel = require("./mentees/models/index");
const Mentee = require("./mentees/models/Mentee");
const M = require("./mentors/model/signUp");
//
const connectDB = require("./config/db");
// load config
dotenv.config({ path: "./config/config.env" });
// connecting to DB
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
// mentees sign up
app.post("/mentee/signup", (req, res) => {
  // console.log(req);
  console.log(req.body);
  const newMentee = new MenteesSignUpModal({
    fullName: req.body.fullName,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    type: req.body.type,
  });
  newMentee.save().then(() => {
    const token = jwt.sign(
      {
        userEmail: req.body.email,
      },
      "RANDOM-TOKEN",
      { expiresIn: "24h" }
    );
    res.status(200).send({
      message: "signup Successfully",
      response: {
        user: {
          email: req.body.email,
          name: req.body.fullName,
          type: req.body.type,
        },
        token,
      },
    });
  });
  // return res.status(201).json({ message: "Account created successfully!" });
});
// mentees sign in
app.post("/mentee/signin", (req, res) => {
  console.log(req.body.email);
  MenteesSignUpModal.findOne({ email: req.body.email })
    .then((user) => {
      if (user.password !== req.body.password) {
        return res.status(400).send({
          message: "Password does not match",
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
        response: {
          email: user.email,
          type: user.type,
        },
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
// mentors sign up
//
app.post("/mentor/signup", (req, res) => {
  // console.log(req);
  console.log(req.body);
  const newMentor = new MentorsSignupScheema({
    fullName: req.body.fullName,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    category: req.body.category,
    type: req.body.type,
  });
  newMentor.save().then(() => {
    const token = jwt.sign(
      {
        userEmail: req.body.email,
      },
      "RANDOM-TOKEN",
      { expiresIn: "24h" }
    );
    res.status(200).send({
      message: "signup Successfully",
      response: {
        user: {
          email: req.body.email,
          name: req.body.fullName,
          type: req.body.type,
        },
        token,
      },
    });
  });
  // return res.status(201).json({ message: "Account created successfully!" });
});
// mentors sign in
app.post("/mentor/signin", (req, res) => {
  MentorsSignupScheema.findOne({ email: req.body.email })
    .then((user) => {
      if (user.password !== req.body.password) {
        return res.status(400).send({
          message: "password does not match",
        });
      }
      const token = jwt.sign(
        {
          userId: user._id,
          userEmail: user.email,
        },
        "RANDOM-TOKEN",
        {
          expiresIn: "24h",
        }
      );
      res.status(200).send({
        message: "Login Successfully",
        response: {
          email: user.email,
          type: user.type,
        },
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
app.get("/categories", auth, (req, res) => {
  res.json({
    message: "you are authorized to access me",
    response: [
      {
        title: "software developers",
      },
      {
        title: "fashion",
      },
      {
        title: "showbees",
      },
      {
        title: "media",
      },
      {
        title: "enterprenure / business",
      },
    ],
  });
});
app.listen();

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("Server is running " + process.env.NODE_ENV));
