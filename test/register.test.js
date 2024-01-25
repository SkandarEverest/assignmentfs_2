const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { hashPassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')


beforeAll(async ()=>{

})

afterAll(async ()=>{
    await sequelize.queryInterface.bulkDelete('Users', null,{ truncate: true, cascade: true,restartIdentity:true });

})

describe('POST /register - register new user ', ()=>{
    it('responds with 201 when success', async ()=>{
        const body = {
            username:'test',
            email:'test@gmail.com',
            password:'testtest'
        }
        const response = await request(app).post('/users/register').send(body)
        expect(response.status).toBe(201)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'Register account success')
    })

    it('500 failed register - no email inputted', async ()=>{
        const body = {
            username:'test',
            password:'testtest'
        }
        const response = await request(app).post('/users/register').send(body)
        expect(response.status).toBe(500)
        expect(response.body).toHaveProperty('message', expect.any(Array))
        expect(response.body.message).toEqual(expect.arrayContaining(["email is null"]))
    })
    

    it('500 failed register - no password inputted', async ()=>{
        const body = {
            username:'test',
            email:'test@gmail.com',
        }
        const response = await request(app).post('/users/register').send(body)
        expect(response.status).toBe(500)
        expect(response.body).toHaveProperty('message', expect.any(Array))
        expect(response.body.message).toEqual(expect.arrayContaining(["password is null"]))
    })

    it('500 failed register - no name inputted', async ()=>{
        const body = {
            email:'test@gmail.com',
            password:'testtest'
        }
        const response = await request(app).post('/users/register').send(body)
        expect(response.status).toBe(500)
        expect(response.body).toHaveProperty('message', expect.any(Array))
        expect(response.body.message).toEqual(expect.arrayContaining(["username is null"]))
    })

    it('500 failed register - Email is not unique', async ()=>{
        const body = {
            username:'test',
            email:'test@gmail.com',
            password:'testtest'
        }
        const response = await request(app).post('/users/register').send(body)
        expect(response.status).toBe(500)
        expect(response.body).toHaveProperty('message', expect.any(Array))
        expect(response.body.message).toEqual(expect.arrayContaining(["email must be unique"]))
    })

    it('500 failed register - Email input is not email', async ()=>{
        const body = {
            username:'test',
            email:'test',
            password:'testtest'
        }
        const response = await request(app).post('/users/register').send(body)
        expect(response.status).toBe(500)
        expect(response.body).toHaveProperty('message', expect.any(Array))
        expect(response.body.message).toEqual(expect.arrayContaining(["invalid email format"]))
    })
})

