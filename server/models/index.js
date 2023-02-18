const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String,
  name: String,
  password: String,
});
const UserModel = mongoose.model("users", UserSchema);

const VideoSchema = new mongoose.Schema({
  title: String,
  tags: Array,
  url: String,
  duration: String,
  timeStamp: String,
});
const VideoModel = mongoose.model("videos", VideoSchema);

module.exports = {
  UserModel,
  VideoModel,
};
