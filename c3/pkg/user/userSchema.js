const mongoose = require("mongoose");
// instaliranje na validator npm i validator
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    lowercase: true, //site bukvi da se mali
    unique: true, // sekoj email da ni e razlicen
    validate: [validator.isEmail, "Please provide a valid email"], //validacija preku biblioteka
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters"],
    // validate: [
    //   validator.isStrongPassword,
    //   "Please provide a strong password which contains...",
    // ],
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
