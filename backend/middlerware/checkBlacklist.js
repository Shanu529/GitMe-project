


import { connectRedis } from "../config/redis.js";

export const checkBlackList = async (req, res, next) => {
    //  read Authorization header

    const authHeader = req.header.authorization;

    if (!authHeader) {
        return next(); // no token 
    }

    // get token from bearer 
    const token = authHeader.split(" ")[1];
    if (!token) { return next() }

    const redis = await connectRedis();

    // check token is exist or not in redis
    const isBlock = redis.get(`blacklist:${token}`);

    if (isBlock) {
        return res.status(401).json({ message: "Token revoked. Please try again." })
    }

    // is token not blacklist then move to next();
    next();

}