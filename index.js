const express = require('express')
const app = express()
const redis = require("redis");
const redisClient = require("./Config/redis");
require('dotenv').config();

const port = process.env.PORT

app.use('/', require('./Routes'));

app.listen(port, (err) => {
    if (err) {
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Server is running on port : ${port}`);
})