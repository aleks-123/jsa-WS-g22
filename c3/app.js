const express = require("express");
const morgan = require("morgan");

const auth = require("./handlers/authHandler");

const db = require("./pkg/db/index");

const app = express();

// midelwares
app.use(express.json());
app.use(morgan("dev"));

//data baza
db.init();

/// ruti
app.post("/api/v1/auth/create-account", auth.signup);
app.post("/api/v1/auth/login");

app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.log("Could not start service");
  }
  console.log("service started successfully on port 10000");
});
