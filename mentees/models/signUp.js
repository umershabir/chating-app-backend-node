const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// user signup schema
const menteesSignupScheema = new Schema({
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
  date: {
    type: Date,
    default: Date.now,
    required: false,
  },
});
// console.log(mongoose.model("User", SignupSchema));
module.exports =
  mongoose.model.Mentees || mongoose.model("Mentees", menteesSignupScheema);
