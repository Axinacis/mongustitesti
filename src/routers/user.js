const express = require('express');
const User = require('../models/user');
const auth = require('../auth.js');

const userRouter = new express.Router();

/*userRouter.post('/users', (req, res) => {
    const user = new User(req.body)
    user.save().then(()=>{
        res.status(201).send(user)
    }).catch((e) => {
        res.status(400).send(e)
    })
})*/

userRouter.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        const token = await user.generateToken();
        res.status(201).send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
});

/*userRouter.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users)
    }).catch((e)=> {
        res.status(500).send(e)
    })
})*/

userRouter.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users)
    } catch (e) {
        res.status(500).send(e)
    }
});

/*userRouter.get('/users/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
});*/

userRouter.get('/users/:id', auth, async (req, res) => {
    res.send(req.user)
});

/*userRouter.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
});*/

userRouter.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove();
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
});

/*userRouter.patch('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, {name: 'kakex kikarex'})
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
});*/

/*userRouter.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password'];
    const isValid = updates.every((update) => allowedUpdates.includes(update));
    if (!isValid) {
        return res.status(400).send({error: 'Invalid updates!'})
    }
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send()
        }
        updates.forEach((update) => user[update] = req.body[update]);
        await user.save();
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }

});*/

userRouter.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password'];
    const isValid = updates.every((update) => allowedUpdates.includes(update));
    if (!isValid) {
        return res.status(400).send({error: 'Invalid updates!'})
    }
    try {
        updates.forEach((update) => req.user[update] = req.body[update]);
        await req.user.save();
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }

});


userRouter.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByEmail(req.body.email, req.body.password);
        const token = await user.generateToken();
        res.send({user, token})

    } catch (e) {
        res.status(400).send()
    }
});

userRouter.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((element) => {
            return element.token !== req.token
        });
        await req.user.save();
        res.send()

    } catch (e) {
        res.status(500).send()
    }
});

userRouter.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send()
    } catch (e) {
        res.status(500).send()
    }
});

module.exports = userRouter;
