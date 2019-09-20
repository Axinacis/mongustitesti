const express = require('express');
const path = require('path');
// const mongoose = require('mongoose');
// const birdRouter = require('./routers/bird');
// const userRouter = require('./routers/user');

// const axios = require('axios');
// const Bird = require('./models/bird');
/*

mongoose.connect('mongodb://localhost:27017/bird-api', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
});
*/

// const app = express();
const app = require('./app')
app.use(express.static(path.join(__dirname, '../public')));

const port = process.env.PORT;


// app.use(express.json());
// app.use([userRouter, birdRouter]);


app.listen(port, () => {
    console.log('Listening to port ' + port)
});
