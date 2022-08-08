const mongoose = require("mongoose");
// const { roles } = require("../utils/constants");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  // roleIds: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "Role",
  //     required: true,
  //   },
  // ],
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_PRIVATE_KEY);
  return token;
};

const User = mongoose.model("User", userSchema);

exports.User = User;
