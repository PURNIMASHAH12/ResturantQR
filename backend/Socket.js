const { Server } = require("socket.io");

let io;

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
    },
  });

  io.on("connection", (socket) => {
    console.log(
      "Client connected:",
      socket.id
    );

    socket.on("disconnect", () => {
      console.log(
        "Client disconnected:",
        socket.id
      );
    });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error(
      "Socket.IO has not been initialized"
    );
  }

  return io;
};

module.exports = {
  initSocket,
  getIO,
};