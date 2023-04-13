const express = require("express");
const morgan = require("morgan");

const auth = require("./handlers/authHandler");
const movies = require("./handlers/movies");

const db = require("./pkg/db/index");

const app = express();

// midelwares
app.use(express.json());
app.use(morgan("dev"));

//data baza
db.init();

/// ruti
app.post("/api/v1/auth/create-account", auth.signup);
app.post("/api/v1/auth/login", auth.login);

app.get("/movies", auth.protect, movies.getAll);
app.get("/movies/:id", auth.protect, movies.getOne);
app.post("/movies", movies.create);
app.put("/movies/:id", movies.replace);
app.patch("/movies/:id", movies.update);
app.delete("/movies/:id", movies.delete);

app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.log("Could not start service");
  }
  console.log("service started successfully on port 10000");
});
