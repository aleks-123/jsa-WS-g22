const express = require("express");
const post = require("./handlers/postHandler");
const db = require("../../pkg/db/index");
const jwt = require("express-jwt");
const cors = require("cors");
const api = express();

api.use(express.json());
api.use(cors());
db.init();

api.get("/api/v1/posts/console1", (req, res) => {
  console.log("This is service1");
  res.send("this is service1");
});

api.use(
  jwt.expressjwt({
    algorithms: ["HS256"],
    secret: process.env.JWT_SECRET,
  })
);

api.get("/api/v1/posts/me", post.getByUser);
api.post("/api/v1/posts/createuser", post.createByUser);

api.get("/api/v1/posts", post.getAll);
api.get("/api/v1/posts/:id", post.getOne);
api.post("/api/v1/posts", post.create);
api.patch("/api/v1/posts/:id", post.update);
api.delete("/api/v1/posts/:id", post.delete);

api.listen(process.env.PORTPOST, (err) => {
  if (err) {
    return console.log("Could not start a service");
  }
  console.log(" service started successfully on port 9001");
});
