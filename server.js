'use strict';

const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");


const redis = require('redis');
const client = redis.createClient({
    host: 'redis',
    port: 6379
});

app.get('/', (req, res) => {
    client.incr('hits');
    client.get('hits', (err, hit) => {
        if (err) throw err;
        res.send(`Hits: ${hit}`);
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`);
});


mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/Mapty", { useNewUrlParser: true });
mongoose.connection
  .once("open", function() {
    console.log("connection established");
  })
  .on("error", function(error) {
    console.log("error occured");
  });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(require("../routes/api"));



const server = app.listen(PORT, function() {
  console.log("server running");
});

const io = require("socket.io")(server); // socket setup
let users = 0;
io.on("connection", function(socket) {
 

  sendStatus = function(s) {
    socket.emit(" status", s);
  };

  users++;
  socket.emit("newclientconnect", { description: "Hello, welcome!" });


  io.sockets.emit("broadcast", { description: users + " " + "is connected" });

  socket.on("comms", function(data) {
    io.sockets.emit("comms", data);
  });

  
  socket.on("typing", function(data) {
    socket.broadcast.emit("typing", data);
  });


  socket.on("disconnect", function() {
    users--;
    io.sockets.emit("broadcast", { description: users + " " + "is connected" });
    console.log("disconnected");
  });
});
