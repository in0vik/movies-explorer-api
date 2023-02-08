const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { PORT, DB_ADDRESS } = require("./config/config");
const { mongoose } = require("mongoose");

mongoose.connect(DB_ADDRESS);
app.use(bodyParser.json());
app.use(routes);
app.listen(PORT, () => {
  console.log('rabotaet');
})