const mongoose = require("mongoose");
const Univerzitet = require("./univerzitetSchema");

const fakultetSchema = new mongoose.Schema({
  ime: {
    type: String,
    required: [true, "Mora da ima ime na fakultetot"],
  },
  univerzitet: {
    type: String,
    required: [true, "Mora da se navedi univerzitetpt"],
  },
  profesori: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
});

fakultetSchema.pre("save", async function (next) {
  const univerzitet = await Univerzitet.findOne({
    ime: this.univerzitet,
  });
  if (univerzitet) {
    univerzitet.fakulteti.push(this);
    await univerzitet.save();
  }

  next();
});

const Fakultet = mongoose.model("Fakultet", fakultetSchema);

module.exports = Fakultet;
