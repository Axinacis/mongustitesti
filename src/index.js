const express = require('express');
const mongoose = require('mongoose');
const birdRouter = require('./routers/bird');
const userRouter = require('./routers/user');
// const Bird = require('./models/bird');

mongoose.connect('mongodb://localhost:27017/bird-api', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
});

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use([userRouter, birdRouter]);

/*
Bird.findByIdAndUpdate("5d68d64c71801e06f801f2c7", {count: 99}).then(bird => {
    console.log(bird);
    return Bird.countDocuments({count: 99})
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
});


const updateCountAndRecount = async (id, count) => {
    const bird = await Bird.findByIdAndUpdate(id, {count});
    const result = await Bird.countDocuments({count});
    return result
};

updateCountAndRecount("5d68d64c71801e06f801f2c7", 3).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
});
*/


app.listen(port, () => {
    console.log('Listening to port 3k')
});


/*
const pulu = new Bird({
    name: 'Harakka Jr. II',
    place: 'Juottolan roskis',
    count: 1.2
})

pulu.save()
    .then(()=>console.log('Prööt'))
    .catch((error)=> console.log('Töttöröö' + error))
const mortti = new User({
    name: 'Irmeli Murmelsson',
    email: 'exTrA@y.com',
    password: 'kamelikemeli'
});

User.init()
    .then(
        mortti.save()
            .then(() => console.log('User saved'))
            .catch((error) => console.log('User save error: ' + error))
    );
*/
