

import { createClient } from "redis"

let redisClient = null;

export const connectRedis = async () => {

    if(!redisClient){
        redisClient = createClient({
            url: process.env.REDIS_URL,
        })

        redisClient.on("error",(err)=>{
            console.log("someting went wrong with redis");
            
        })
    }
    if (!redisClient.isOpen) {
        await redisClient.connect();
        console.log("redis connected");

    }

    return redisClient;
    
}