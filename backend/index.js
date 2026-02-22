


import dotenv from "dotenv";
dotenv.config({ path: "./backend/.env" });

import express from "express";
import http from "http";
import cors from "cors";

import connectDB from "./db/db.js";
import mainRouter from "./routes/main.router.js";
import { Server } from "socket.io";
import { connectRedis } from "./config/redis.js";
import redisRoute from "./routes/redisTest.js";
import { checkBlackList } from "./middlerware/checkBlacklist.js";



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


app.use(checkBlackList);
app.use("/", mainRouter);
app.use("/", redisRoute)


let redis
const serverStart = async () => {

  try {
    await connectDB()
    redis = await connectRedis();
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);

    })

  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1); // stop app if something fails
  }
}

serverStart();
export { redis };