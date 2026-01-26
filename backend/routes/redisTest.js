

import { redis } from "../index.js";
import express from "express";

const redisRoute = express.Router();

redisRoute.get("/redis", async (req,res) =>{
    await redis.set("user1", "shu");
    const value = await redis.get("user1");

    res.json({value})
})

export default redisRoute;
