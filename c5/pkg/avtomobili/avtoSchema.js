const mongoose = require("mongoose");

const avtoSchema = new mongoose.Schema({
  marka: {
    type: String,
  },
  gorivo: {
    type: String,
    enum: ["dizel", "benzin", "elektricna"],
  },
  kilometraza: {
    type: Number,
  },
  tip: {
    type: String,
    enum: ["sedan", "hatchback", "kabrio"],
  },
  slika: {
    type: String,
    default: "shablon.png",
  },
  sliki: [String],
  opis: {
    type: String,
  },
});

const Avtomobil = mongoose.model("Avtomobili", avtoSchema);

module.exports = Avtomobil;
