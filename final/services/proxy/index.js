const express = require("express");
const proxy = require("express-http-proxy");
const cors = require("cors");
const api = express();

api.use(cors());

// proxy middelware for auth
const authProxy = proxy("http://localhost:9000", {
  proxyReqPathResolver: (req) => {
    return `/api/v1/auth${req.url}`;
  },
});

// proxy middelware for post
const postProxy = proxy("http://localhost:9001", {
  proxyReqPathResolver: (req) => {
    return `/api/v1/posts${req.url}`;
  },
});

// implementacija na ovie middelwari
api.use("/api/v1/auth", authProxy);
api.use("/api/v1/posts", postProxy);

api.listen(9002, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("proxy service started on port 9002");
});
