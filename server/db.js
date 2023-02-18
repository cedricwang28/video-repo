const mongoose = require("mongoose");

module.exports = () => {
  try {
    mongoose.connect(process.env.DB);
    mongoose.connection.once("open", function () {
      console.log("db connected!");
    });
  } catch (error) {
    console.log("could not connect to database");
  }
};
