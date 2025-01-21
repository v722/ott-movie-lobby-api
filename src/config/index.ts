export const config = {
    NODE_ENV: process.env.NODE_ENV || 3001,
    DB_URL: process.env.DB_URL || "mongodb://localhost:27017/lobby",
    JWT_TOKEN_EXPIRE_TIME: "48h",
    JWT_SECRET: "!24356P2",
    REDIS: {
        HOST: "localhost",
        PORT: 6379
    }
};