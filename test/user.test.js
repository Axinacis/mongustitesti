const app = require('../src/app');
const User = require('../src/models/user');
const request = require('supertest');
const {userOneId, userOne, setupDatabase} = require('./setup/db');

beforeEach(setupDatabase);

//testataan / POST /users
test('Should signup a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Irmeli',
        email: 'murmeli@elukka.com',
        password: 'mursu1234'
    }).expect(201);

    const user = await User.findById(response.body.user._id);

    //testataan että tietokantaan meni jotain
    expect(user).not.toBeNull();

    //testataan responsea usernamen perusteella
    expect(response.body.user.name).toBe('Irmeli');

    //testataan että responsen objekti on oikein
    expect(response.body).toMatchObject({
        user: {
            name: 'Irmeli',
            email: 'murmeli@elukka.com'
        },
        token: user.tokens[0].token
    })
});