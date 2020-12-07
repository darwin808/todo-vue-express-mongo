const express = require("express");
const router = express.Router();
const Darwin = require("../models/darwin");
const cors = require("cors");

const app = express();

//const http = require("http").Server(app);
//const io = require("socket.io")(http);

router.get("/darwin", async (req, res) => {
  const darwin = await Darwin.find();
  // io.emit("ADDED_DATA", req.body);
  res.send(darwin);
});

router.post("/darwin", (req, res) => {
  console.log(req.body);
  Darwin.create(req.body).then((e) => {
    res.send(e);
  });
});

router.put("/darwin/:id", (req, res) => {
  Darwin.findByIdAndUpdate({ _id: req.params.id }, req.body).then((e) => {
    Darwin.findOne({ _id: req.params.id }).then((y) => console.log(y));
  });
  res.send({ type: "put" });
});

router.delete("/darwin/:id", (req, res) => {
  //console.log(req.params.id);
  Darwin.findByIdAndDelete({ _id: req.params.id }).then((e) => {
    console.log(res.body);
  });

  res.send({ type: "del" });
});

module.exports = router;
