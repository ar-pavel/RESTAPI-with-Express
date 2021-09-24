const request = require('supertest');
const app = require('../app')
const DBinitializer = require("../config/DBinitializer")

beforeAll( ()=>{
    return DBinitializer(true);
});

describe('/', () => {
    describe('GET', () => {
        
        test('should respond with status code 200', async () => {
            const res = await request(app).get("/").send();
            expect(res.statusCode).toBe(200);
        })
        
        test('should return greetings', async () => {
            const res = await request(app).get("/").send();
            expect(res.body).toMatch("HELLO from EXPRESS!");
        })
        
    })
    
})


describe('/signup', () => {
    
    console.log = jest.fn()

    describe('POST', () => {

        test('should create a new author', async () => {
            let author = { 
                name:"jhon doe", 
                password: "test@password", 
                email: "test@demo.email"
            };
            
            const res = await request(app)
                                .post("/signup")
                                .send(author);


            console.log(res.statusCode);

            expect(res.statusCode).toBe(201);

        })

        test('should fail with status code 409 for user already exist', async () => {
            let author = { 
                name:"jhon doe", 
                password: "test@password", 
                email: "test@demo.email"
            };
            
            const res = await request(app)
                                .post("/signup")
                                .send(author);


            expect(res.statusCode).toBe(409);

        })
        
        test('should fail with status code 400 for incomplete user info', async () => {
            let author = { 
                name:"jhon doe", 
                email: "test@demo.email"
            };
            
            const res = await request(app)
                                .post("/signup")
                                .send(author);


            expect(res.statusCode).toBe(400);

        })
        
    })
    
        
})


describe('/login', () => {
    
    console.log = jest.fn()

    describe('POST', () => {

        test('should succesfully login with statuscode 200', async () => {
            let author = { 
                password: "test@password", 
                email: "test@demo.email"
            };
            
            const res = await request(app)
                                .post("/login")
                                .send(author);


            console.log(res.statusCode);

            expect(res.statusCode).toBe(200);

        })

        test('should fail to login with invalid credentials', async () => {
            let author = { 
                password: "wrong@password", 
                email: "test@demo.email"
            };
            
            const res = await request(app)
                                .post("/login")
                                .send(author);


            expect(res.statusCode).toBe(401);

        })
        
        test('should fail with status code 400 for incomplete user info', async () => {
            let author = { 
                name:"jhon doe", 
                email: "test@demo.email"
            };
            
            const res = await request(app)
                                .post("/login")
                                .send(author);


            expect(res.statusCode).toBe(400);

        })
        
    })
    
        
})


// describe('/articles', () => {
    
// })

