const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const homeRouter = require("./routers/homeRouter");
const path = require("path");
const { application } = require("express");
const static_path = path.join(__dirname, "./public");
const template_path = path.join(__dirname, "./views");
const app = express();

// db connection
mongoose.connect("mongodb://localhost:27017/justuse", {
  useNewUrlParser: true,
});
const db = mongoose.connection;

db.on("error", () => {
  console.log("error in conection");
});
db.once("open", () => {
  console.log("Connected");
});

app.set("view engine", "ejs");
app.set("views", template_path);
app.use(express.static(static_path));

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use("/", homeRouter);

// Server
const port = 4000;
app.listen(port, () => {});
