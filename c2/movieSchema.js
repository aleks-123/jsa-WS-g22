const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  year: {
    type: Number,
  },
  genre: {
    type: String,
  },
  director: {
    type: String,
  },
  realised: {
    type: Date,
  },
  metascore: {
    type: Number,
  },
  imdbRating: {
    type: Number,
  },
  plot: {
    type: String,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
