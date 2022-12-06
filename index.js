const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const routes = require("./src/routes");
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// CONNECT DB
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connect DB successfully");
  })
  .catch((err) => {
    console.log("err: " + err);
  });

// MIDDLEWARE
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES
routes(app);

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
