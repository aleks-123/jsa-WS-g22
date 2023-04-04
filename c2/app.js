const express = require("express");
const dotenv = require("dotenv");
const movies = require("./handlers/movies");
const connectToMongoDB = require("./pkg/db/index");
const morgan = require("morgan");

const app = express();

// Midelware funkcii sto bi se izvrsuvale pred responsot
app.use(express.json());
// const logRequest = (req, res, next) => {
//   console.log(`${req.method} ${req.url}`);
//   next();
// };
// app.use(logRequest);
app.use(morgan("dev"));

// Instaliranje na dotenv // npm i dotenv
// so ova konfigurirame da se vcita config.env fajlot
dotenv.config({ path: "./config.env" });
// proveruvame dali imame pristap do config.env informaciite
// console.log(process.env);

// const DB = process.env.DATABASE.replace(
//   "<PASSWORD>",
//   process.env.DATABASE_PASSWORD
// );

// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("successfull conection to our DATABASE");
//   })
//   .catch((err) => console.log(err));

connectToMongoDB.init();

app.get("/movies", movies.getAll);
app.get("/movies/:id", movies.getOne);
app.post("/movies", movies.create);
app.put("/movies/:id", movies.replace);
app.patch("/movies/:id", movies.update);
app.delete("/movies/:id", movies.delete);

app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.log("Could not start service");
  }
  console.log("Service started successfully on port 10000");
});
