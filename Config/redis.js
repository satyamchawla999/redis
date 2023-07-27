const redis = require("redis");

let redisClient;
(async () => {
    redisClient = redis.createClient();

    redisClient.on("error", (error) => console.error(`Error : ${error}`));

    redisClient.once('open',()=>{
        console.log('Connected to redis');
    });

    await redisClient.connect();
})();



module.exports = redisClient;

