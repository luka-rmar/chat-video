const express = require("express");
const app = express()
const { PeerServer } = require("peer")

const server = require("http").createServer(app);
const { Server } = require("socket.io");
const { v4: uuidV4 } = require("uuid");

const io = new Server(server)
const peerServer = PeerServer({ port: 9001, path: '/' })

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json())

app.get("/", (req, res) => {
  res.redirect(`/${1}`)
})

app.get("/:room", (req, res) => {
  res.render("room", { roomId: req.params.room })
})

io.on("connection", socket => {
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    
    socket.broadcast.to(roomId).emit("user-connected", userId)

    socket.on("disconnect", () => {
      socket.broadcast.to(roomId).emit("user-disconnected", userId)
    })
  })
})

server.listen(3030, () => {
  console.log("Servidor rodando na porta 3030 🎯");
})