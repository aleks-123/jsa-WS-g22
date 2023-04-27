const express = require("express");

const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const db = require("./pkg/db/index");
const avtoHandler = require("./handlers/avtoHandler");
const viewHandler = require("./handlers/viewHandler");
const auth = require("./handlers/authHandler");

const app = express();
// midelware
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(req.cookies);
  next();
});

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.set("view engine", "ejs");

db.init();

// izgled ruta
app.get("/oglas", auth.protect, viewHandler.oglasView);
app.post("/createOglas", avtoHandler.uploadCarsPhoto, viewHandler.createOglas);
app.get("/login", viewHandler.getLoginForm);

// Auth ruta
app.post("/api/v1/auth/create-account", auth.signup);
app.post("/api/v1/auth/login", auth.login);

app.post("/forgotPassword", auth.forgotPassword);
app.patch("/resetPassword/:token", auth.resetPassword);

// avtomobili ruti
app.get("/avtomobili", avtoHandler.getAll);
app.get("/avtomobili/:id", avtoHandler.getOne);

app.post("/avtomobili", avtoHandler.create);
app.patch("/avtomobili/:id", avtoHandler.uploadCarsPhoto, avtoHandler.update);
app.delete("/avtomobili/:id", avtoHandler.delete);

app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.log("Could not start service");
  }
  console.log("service started successfully on port 10000");
});
