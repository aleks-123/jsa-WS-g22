// povikuvanje na mongoose paketot
const mongoose = require("mongoose");
// definiranje kakva struktura kje imaat dokumentite vo kolekcijata
const univerzitetiSchema = new mongoose.Schema(
  {
    ime: {
      type: String,
      required: [true, "Mora da ima ime"],
    },
    prezime: {
      type: String,
    },
    godina: {
      type: Number,
    },
    fakulteti: Array,
    // fakulteti: [
    //   {
    //     name: {
    //       type: String,
    //     },
    //     year: {
    //       type: Number,
    //     },
    //   },
    // ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

univerzitetiSchema.virtual("celosnoime").get(function () {
  return this.ime + " " + this.prezime;
});

// definiranje na modelot preku koj model kje ja kontrolirame kolekcijata
const Univerzitet = mongoose.model("Univerzitet", univerzitetiSchema);
// exoirtiranje na samiot model za koristenje vo handler ili kade i da ni treba modelot
module.exports = Univerzitet;
