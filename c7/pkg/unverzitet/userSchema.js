const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Mora da ima Email"],
  },
  password: {
    type: String,
    required: [true, "Mora da ima password"],
  },
  role: {
    type: String,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
