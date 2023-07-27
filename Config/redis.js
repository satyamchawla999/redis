const redis = require("redis");

// const session = require('express-session');
// const connectRedis = require('connect-redis');

// const RedisStore = connectRedis(session)

let redisClient;
(async () => {
    redisClient = redis.createClient();

    redisClient.on("error", (error) => console.error(`Error : ${error}`));

    redisClient.on('connect',  (err) => {
        console.log('Connected to redis successfully');
    });

    await redisClient.connect();
})();



module.exports = redisClient;

