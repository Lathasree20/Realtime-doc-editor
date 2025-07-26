// server/index.js
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/editor", {
  // These options are deprecated, no need to add
});
mongoose.connection.once("open", () => console.log("✅ MongoDB connected"));

// ✅ Document Schema
const Document = mongoose.model("Document", new mongoose.Schema({
  _id: String,
  data: Object,
}));

// ✅ Socket.io Real-time logic
io.on("connection", socket => {
  console.log("🟢 New client connected");

  socket.on("get-document", async documentId => {
    let document = await Document.findById(documentId);
    if (!document) {
      document = await Document.create({ _id: documentId, data: "" });
    }

    socket.join(documentId);
    socket.emit("load-document", document.data);

    socket.on("send-changes", delta => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    socket.on("save-document", async data => {
      await Document.findByIdAndUpdate(documentId, { data });
    });
  });
});

server.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
