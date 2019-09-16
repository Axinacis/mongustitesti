const express = require('express');
const Bird = require('../models/bird');
const auth = require('../auth');

const birdRouter = new express.Router();

birdRouter.post('/birds', auth, async (req, res) => {
    const bird = new Bird({
        ...req.body,
        owner: req.user._id
    });
    try {
        await bird.save();
        res.status(201).send(bird)
    } catch (e) {
        res.status(400).send(e)
    }

});

birdRouter.get('/birds', auth, async (req, res) => {
    try {
        const birds = await Bird.find({owner: req.user._id});
        res.send(birds)
    } catch (e) {
        res.status(500).send(e)
    }
});

birdRouter.get('/birds/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
        const bird = await Bird.findById({_id});
        res.send(bird)
    } catch (e) {
        res.status(500).send(e)
    }
});
/*
birdRouter.get('/allbirds', async (req, res) => {
    try {
        const birds = await Bird.find({});
        res.send(birds)
    } catch (e) {
        res.status(500).send(e)
    }
});*/
/*

birdRouter.get('/allbirds', async (req, res) => {
    try {
        const birds = await Bird.find({place: req.query.place, name: req.query.name});
        res.send(birds)
    } catch (e) {
        res.status(500).send(e)
    }
});
*/

birdRouter.get('/allbirds', async (req, res) => {
    const match = {};
    let sortField = '';
    //const mySort = {}

    if (req.query.sortBy) {
        const sortArr = req.query.sortBy.split(':');
        sortField = sortArr[0];
        if (sortArr[1] && sortArr[1].match(/^(desc|descending|-1)$/)) {
            sortField = '-' + sortField
        }
        /*
        mySort[sortArr[0]] = sortArr[1].match(/^(desc|descending|-1)$/) ? -1 : 1
        */
    }

    if (req.query.place) {
        match.place = req.query.place
    }

    if (req.query.name) {
        match.name = req.query.name
    }

    if (req.query.count) {
        match.count = req.query.count
    }

    try {

        const Query = await Bird.find(match).sort(sortField);
        res.send(Query)
    } catch (e) {
        res.status(500).send(e)
    }
});

birdRouter.delete('/birds/:id', auth, async (req, res) => {
    try {
        const bird = await Bird.findOneAndDelete({_id: req.params.id, owner: req.user._id});
        if (!bird) {
            return res.status(404).send()
        }
        res.send(bird)
    } catch (e) {
        res.status(500).send(e)
    }
});

birdRouter.patch('/birds/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'place', 'count'];
    const isValid = updates.every((update) => allowedUpdates.includes(update));
    if (!isValid) {
        return res.status(400).send({error: 'Invalid updates!'})
    }
    try {
        const bird = await Bird.findOne({_id: req.params.id, owner: req.user._id});
        if (!bird) {
            return res.status(404).send()
        }
        updates.forEach((update) => bird[update] = req.body[update]);
        await bird.save();
        res.send(bird)
    } catch (e) {
        res.status(500).send(e)
    }
});

/*birdRouter.post('/birds', (req, res) => {
    const bird = new Bird(req.body)
    bird.save().then(()=>{
        res.status(201).send(bird)
    }).catch((e) => {
        res.status(400).send(e)
    })
})*/

/*birdRouter.post('/birds', async (req, res) => {
    try {
        const bird = new Bird(req.body);
        await bird.save();
        res.status(201).send(bird)
    } catch (e) {
        res.status(400).send(e)
    }
});*/

/*birdRouter.get('/birds', (req, res) => {
    Bird.find({}).then((birds) => {
        res.send(birds)
    }).catch((e)=> {
        res.status(500).send(e)
    })
})*/

/*birdRouter.get('/birds', async (req, res) => {
    try {
        const birds = await Bird.find({});
        res.send(birds)
    } catch (e) {
        res.status(500).send(e)
    }
});*/

module.exports = birdRouter;