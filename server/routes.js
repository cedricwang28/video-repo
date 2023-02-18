const express = require("express");
const router = express.Router();
const { UserModel, VideoModel } = require("./models/index");
const { getVideoDurationInSeconds } = require("get-video-duration");
const { toHHMMSS } = require("./util");
const jwt = require("jsonwebtoken");

router.get("/", (req, res, next) => {
  res.send("/");
});

router.post("/email", (req, res, next) => {
  console.log(req.body.email);
  UserModel.find({ email: req.body.email }, (err, doc) => {
    console.log(doc);
    try {
      res.send(doc);
    } catch {
      res.status(400).send(err);
    }
  });
});

router.post("/login", (req, res, next) => {
  console.log(req.body, "login");
  res.status(200).json({
    token: jwt.sign(req.body, process.env.SECRET, { expiresIn: "24h" }),
  });
});

router.post("/auth", async (req, res, next) => {
  try {
    let decoded = jwt.verify(req.body.token, process.env.SECRET);
    res.status(200).json({
      payload: decoded,
      message: "auth passed",
      code: 1,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/videos", async (req, res, next) => {
  try {
    const videos = await VideoModel.find();
    res.status(201).send({ data: videos });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/video/:id", async (req, res, next) => {
  try {
    const video = await VideoModel.find({ _id: req.params.id });
    res.status(201).send(video);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.post("/video", async (req, res, next) => {
  try {
    const duration = await getVideoDurationInSeconds(req.body.url);
    req.body.duration = toHHMMSS(duration);
    const videos = await VideoModel(req.body).save();
    res
      .status(201)
      .send({ data: videos, message: "video created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
