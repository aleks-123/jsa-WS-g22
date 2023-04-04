const mongoose = require("mongoose");
const dotenv = require("dotenv");
// Dotenv go koristime za da dobieme pristap do nashiot config.env fajl

dotenv.config({ path: `${__dirname}/../../config.env` });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

exports.init = async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("successfully connected to our DATABASE");
  } catch (err) {
    console.log(err);
  }
};

exports.test = async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("successfully connected to our DATABASE");
  } catch (err) {
    console.log(err);
  }
};
