const express = require("express");
const mongoose = require("mongoose");
const movies = require("./handlers/movies");

const app = express();

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://aleksandar:YRzFP7MITu4YfYZo@cluster0.dle0u6v.mongodb.net/netliks?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("successfull conection to our ");
  })
  .catch((err) => console.log(err));

app.get("/movies", movies.getAll);
app.get("/movies/:id", movies.getOne);
app.post("/movies", movies.create);
app.put("/movies/:id", movies.replace);
app.patch("/movies/:id", movies.update);
app.delete("/movies/:id", movies.delete);

app.listen(10000, (err) => {
  if (err) {
    return console.log("Could not start service");
  }
  console.log("Service started successfully on port 10000");
});
