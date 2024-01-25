const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { hashPassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')


beforeAll(async ()=>{

    await sequelize.queryInterface.bulkInsert('Users', [
        {
          username:'user 1',
          email: 'email1@gmail.com',
          password: hashPassword('password 1'),
          role: 'role 1',
          address: 'address 1',
          phoneNumber: 'phoneNumber 1',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username:'user 2',
          email: 'email2@gmail.com',
          password: hashPassword('password 2'),
          role: 'role 2',
          address: 'address 2',
          phoneNumber: 'phoneNumber 2',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username:'user 3',
          email: 'email3@gmail.com',
          password: hashPassword('password 3'),
          role: 'role 3',
          address: 'address 3',
          phoneNumber: 'phoneNumber 3',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username:'user 4',
          email: 'email4',
          password: hashPassword('password 4'),
          role: 'role 4',
          address: 'address 4',
          phoneNumber: 'phoneNumber 4',
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],{});

})

afterAll(async ()=>{

    await sequelize.queryInterface.bulkDelete('Users', null,{ truncate: true, cascade: true,restartIdentity:true });

})

describe('POST /login - login user', ()=>{
    it('responds with 200 when success', async()=>{
        const body = {
            email: "email1@gmail.com",
            password: "password 1"
        }
        const response = await request(app).post('/users/login').send(body)
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('accessToken', expect.any(String))

    })

    it('500 failed login - Email input is not email', async()=>{
        const body = {
            email: "test",
            password: "password 1"
        }
        const response = await request(app).post('/users/login').send(body)
        expect(response.status).toBe(500)
        expect(response.body).toHaveProperty('message', expect.any(Array))
        expect(response.body.message).toEqual(expect.arrayContaining(["invalid email format"]))

    })

    it('500 failed login - email invalid', async()=>{
        const body = {
            email: "test@gmail.com",
            password: "password 1"
        }
        const response = await request(app).post('/users/login').send(body)
        expect(response.status).toBe(500)
        expect(response.body).toHaveProperty('message', expect.any(Array))
        expect(response.body.message).toEqual(expect.arrayContaining(["invalid email"]))

    })

    it('500 failed login - password invalid', async()=>{
        const body = {
            email: "email1@gmail.com",
            password: "test"
        }
        const response = await request(app).post('/users/login').send(body)
        expect(response.status).toBe(500)
        expect(response.body).toHaveProperty('message', expect.any(Array))
        expect(response.body.message).toEqual(expect.arrayContaining(["invalid password"]))

    })
})

    

