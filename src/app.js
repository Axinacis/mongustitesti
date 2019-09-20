const express = require('express');
const mongoose = require('mongoose');
const birdRouter = require('./routers/bird');
const userRouter = require('./routers/user');

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
});

const app = express();

app.use(express.json());
app.use([userRouter, birdRouter]);

module.exports = app
