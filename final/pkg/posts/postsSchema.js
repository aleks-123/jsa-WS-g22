const mongoose = require("mongoose");

const postShema = new mongoose.Schema({
  title: {
    type: String,
  },
  plot: {
    type: String,
  },
  author: {
    type: String,
  },
});

const Post = mongoose.model("Post", postShema);

module.exports = Post;
