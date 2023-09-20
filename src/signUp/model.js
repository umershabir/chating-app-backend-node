import mongoose from "mongoose";
const Schema = mongoose.Schema;

// user signup schema
const createUser = new Schema({
  fullName: {
    type: String,
    required: true,
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
  accountType: {
    type: String,
    required: true,
    enum: ["mentor", "mentee"],
  },
  date: {
    type: Date,
    default: Date.now,
    required: false,
  },
});

const Users = mongoose.model("Users", createUser);
export default Users;
