const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// user signup schema
const mentorsSignupScheema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: [true, "user name is already exsit"],
  },
  email: {
    type: String,
    required: true,
    unique: [true, "This email is already registered"],
  },
  password: {
    type: String,
    required: true,
    unique: false,
  },
  category: {
    enum: ["developer", "showbees", "fashion"],
    type: String,
    required: true,
    description: "atleast one category is required",
  },
  type: {
    type: String,
    required: true,
    enum: ["mentor"],
  },
  date: {
    type: Date,
    default: Date.now,
    required: false,
  },
});
// console.log(mongoose.model("User", SignupSchema));
module.exports = mongoose.model("Mentors", mentorsSignupScheema);
