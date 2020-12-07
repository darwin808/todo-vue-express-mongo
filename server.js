const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const db = mongoose.connection;
const serveStatic = require("serve-static");
const app = express();
/************PUHER */
//const Pusher = require("pusher");
/**psuher 
const pusher = new Pusher({
  appId: "1118363",
  key: "343fb1b9d4957c1a8e16",
  secret: "I141011c2206aaa6dd8d6",
  cluster: "api",
  encrypted: true,
});

*/
//const channel = "mypp";
/************PUHER */
app.use(cors());
app.use("/", serveStatic(path.join(__dirname, "/dist")));
//const server = require("http").Server(app);
//const io = require("socket.io")(server);
///////////////mongodb
mongoose
  .connect(
    "mongodb+srv://darwin:gand27ef@cluster0.elwtd.mongodb.net/mypp?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    /**new addded */

    /**new addded */
    console.log("MongoDB Connected…");
  })
  .catch((err) => console.log(err));

db.on("error", console.error.bind(console, "Connection Error:"));

////////////////////////////
//app.listen(process.env.PORT || 8080);
//console.log("connected to port: 3001");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", require("./routes/api"));

const port = process.env.PORT || 8080;
app.listen(port);
//app.listen(process.env.port || port, console.log("PORT:3001"));
// socket io
/*
io.on("connection", function(socket) {
  console.log("User connected");
  socket.on("disconnect", function() {
    console.log("User disconnected");
  });
  socket.on("save-message", function(data) {
    console.log(data);
    io.emit("new-message", { message: data });
  });
});

*/
