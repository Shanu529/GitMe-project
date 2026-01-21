




import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import mainRouter from "./routes/main.router.js";
import { Server } from "socket.io";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  console.log("socket connected:", socket.id);
});

app.use("/", mainRouter);

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
