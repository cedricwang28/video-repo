require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connection = require("./db");
const axios = require("axios");
const router = require("./routes");

const app = express();

connection();

app.use(cors());
app.use(express.json());

app.use("/", router);




app.listen(process.env.PORT || 5001, () => {
  console.log("node start", __dirname);
});
