const express = require("express");
const db = require("./pkg/db/index");
const univerzitetHandler = require("./handlers/univerzitetHandler");
const fakultetHandler = require("./handlers/fakultetHandler");
const userHandler = require("./handlers/userHandler");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.init();

app.route("/user").get(userHandler.getAll).post(userHandler.create);

app
  .route("/user/:id")
  .get(userHandler.getOne)
  .patch(userHandler.update)
  .delete(userHandler.delete);

app.route("/fakultet").get(fakultetHandler.getAll).post(fakultetHandler.create);

app
  .route("/fakultet/:id")
  .get(fakultetHandler.getOne)
  .patch(fakultetHandler.update)
  .delete(fakultetHandler.delete);

app
  .route("/univerzitet")
  .get(univerzitetHandler.getAll)
  .post(univerzitetHandler.create);

app
  .route("/univerzitet/:id")
  .get(univerzitetHandler.getOne)
  .patch(univerzitetHandler.update)
  .delete(univerzitetHandler.delete);

app.listen(10000, (err) => {
  if (err) {
    return console.log("Couldnt start the server");
  }
  console.log("service started succesfullt on port 10000");
});
