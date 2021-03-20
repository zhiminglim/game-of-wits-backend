const port = process.env.PORT || 3001;
require('dotenv').config({ path: "./.env" });
var randomstring = require("randomstring");

const express = require("express");
const mongoose = require("mongoose");
const app = express();

const http = require("http");
const socketIo = require("socket.io");

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// ------------ START of Database Default Setup ------------ //
const mongoURL = process.env.MONGO_URL;
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected...")).catch(err => console.log(err));

const game3DSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  gameRoom: String,
  players: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player"
  }]
});

const playerSchema = new mongoose.Schema({
  name: String,
  socketId: String,
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game3D"
  },
  isReady: Boolean
})

const Game3D = mongoose.model("Game3D", game3DSchema);
const Player = mongoose.model("Player", playerSchema);

// ------------ End of Database Default Setup ------------ //


app.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

server.listen(port, function () {
  console.log(`Server started on port ${port}.`);
})
