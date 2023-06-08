const express = require("express");
const auth = require("./handlers/authHandler");
const cors = require("cors");

const db = require("../../pkg/db/index");

const api = express();

db.init();
api.use(express.json());
api.use(cors());

// ruti
api.post("/api/v1/auth/login", auth.login);
api.post("/api/v1/auth/create-account", auth.signup);

api.listen(process.env.PORTAUTH, (err) => {
  if (err) {
    return console.log("Could not start service");
  }
  console.log(`Service started succesfully on port ${process.env.PORTAUTH}`);
});
