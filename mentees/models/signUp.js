const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// user signup schema
const SignupSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: false,
  },
});
// console.log(mongoose.model("User", SignupSchema));
module.exports = MenteeSignup = mongoose.model("User", SignupSchema);
