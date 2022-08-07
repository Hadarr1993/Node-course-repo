const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { userOneId, userOne, setupDatabase} = require('./fixtures/db')


beforeEach(setupDatabase)

test('should signup new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'dor',
        email: 'dor@example.com',
        password: 'MyPass12#'
    }).expect(201)

        //assert that the DB has changed
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

        // assert about the response we are getting
    expect(response.body).toMatchObject({
        user: {
            name: 'dor',
            email: 'dor@example.com'
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('Mypass12#')
})

test('login existing user', async () => {


     const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('should not login user', async () => {
    request(app).post('/users/login').send({
        email: 'fakeuser@example.com',
        password: 'notexist'
    }).expect(401)
})

test('should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('should not get profile for unAuthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('should delete this account', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('should upload image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar' ,'tests/fixtures/profile-pic.jpg')
        .expect(200)
        const user = await User.findById(userOneId)
        expect(user.avatar).toEqual(expect.any(Buffer))
})

test('should update valid users', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'sami'
        })
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user.name).toBe('sami')
})

