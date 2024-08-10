require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("./db/conn.js");
const users = require("./models/userSchema");
const cors = require("cors");
const router = require("./routes/router");

const bodyParser = require("body-parser");

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies

const port = 8003;

app.use(cors());
app.use(express.json());

app.use(router);

app.listen(port, () => {
  console.log(`server is start port number ${port}`);
});

// require("dotenv").config({ path: "./env" });
// import dotenv from "dotenv";
// import connectDB from "./db/conn.js";

// dotenv.config({
//   path: "./server/.env",
// });

// connectDB();

//ye file package.jon me ki hai "dev" : "nodemon -r dotenv/config --experimental-json-modules src/app.js"
