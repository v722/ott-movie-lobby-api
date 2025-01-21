import { config } from "../config";
import { Redis } from "ioredis";

const createRedisClient = () => {
    const client = new Redis({ host: config.REDIS.HOST, port: config.REDIS.PORT });

    client.on("error", (err) => {
        console.error("Redis Client Error:", err);
    });

    client.on("connect", () => {
        console.log("Redis Client Connected");
    });

    return client;
};

export const redisClient = createRedisClient();
