import { Socket } from "socket.io";
import { addUsernameToSocket } from "./middlewares/socketMiddleware";

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
// const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const usersRouter = require("./routes/userRoutes");

const PORT = process.env.PORT || 5001;

const app = express();

const server = http.createServer(app);

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// routes
app.use("/users", usersRouter);

const io = new Server(server, {});

io.use(addUsernameToSocket);

const connectedUsers: any = {};

io.on("connection", (socket: Socket) => {
  console.log(`a user: ${socket.handshake.auth.username} ,connected`);
  connectedUsers[socket.handshake.auth.username] = socket.id;

  socket.on("private-message", (message: any) => {
    console.log("message:", message);
    console.log("connectedUsers:", connectedUsers);
    socket.to(connectedUsers[message.to]).emit("private-message", message);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// console.log(server);
