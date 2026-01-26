

import { connectRedis } from "../config/redis.js";

export const rateLimit = async (req, res, next) => {

    // connect to redis 
    const redis = await connectRedis();

    // identify client based on ip
    const ip = req.ip;

    // create redis key
    const key = `rate${ip}`;

    // increase request count
    const count = await redis.incr(key);

    // first request => 1 & set expiry ( 60 second ) 
    if (count === 1) {
        await redis.expire(key, 60);
    }

    // block if exceend
    if (count > 15) {
        return res.status(429).json({
            message: "Too many requests, try again later"
        });
    }

    next();

}