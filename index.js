const express = require('express')

const app = express();

const session = require('express-session');
const RedisStore = require('connect-redis').default
// const MongoStore = require('connect-mongo')


require('dotenv').config();
const port = process.env.PORT

const redisClient = require("./Config/redis")

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('./Assets'));

app.set('view engine', 'ejs');
app.set('views', './Views');

app.use(session({
    secret: 'blahsomething',
    saveUninitialized: true,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    // store: MongoStore.create({
    //     // mongooseConnection: db,
    //     mongoUrl: 'mongodb://0.0.0.0:27017/session',
    //     autoRemove: 'disabled'
    // },
    // (err) => {
    //     console.log(err || 'connect-mongodb setup ok');
    // })
       store: new RedisStore({ client: redisClient })
    //     console.log(err || 'connect-mongodb setup ok');
    // }),
}))

app.use('/', require('./Routes'));
app.listen(port, (err) => {
    if (err) {
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Server is running on port : ${port}`);
})