const express = require("express");

const morgan = require("morgan");

const db = require("./pkg/db/index");
const avtoHandler = require("./handlers/avtoHandler");

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

db.init();

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
