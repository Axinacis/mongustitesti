const express = require('express');
const Bird = require('../models/bird');

const birdRouter = new express.Router();

/*birdRouter.post('/birds', (req, res) => {
    const bird = new Bird(req.body)
    bird.save().then(()=>{
        res.status(201).send(bird)
    }).catch((e) => {
        res.status(400).send(e)
    })
})*/

birdRouter.post('/birds', async (req, res) => {
    try {
        const bird = new Bird(req.body);
        await bird.save();
        res.status(201).send(bird)
    } catch (e) {
        res.status(400).send(e)
    }
});

/*birdRouter.get('/birds', (req, res) => {
    Bird.find({}).then((birds) => {
        res.send(birds)
    }).catch((e)=> {
        res.status(500).send(e)
    })
})*/

birdRouter.get('/birds', async (req, res) => {
    try {
        const birds = await Bird.find({});
        res.send(birds)
    } catch (e) {
        res.status(500).send(e)
    }
});

module.exports = birdRouter;