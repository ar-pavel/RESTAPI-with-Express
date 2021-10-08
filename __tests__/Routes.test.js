const request = require('supertest');
const app = require('../app')
const DBinitializer = require("../config/DBinitializer")
const DBconnection = require("../model/DB");
const { singleAuthor, singleArticle, articles } = require('../__mocks__/Mocks');

let universalAuthor = exports.author = { 
    name:"Willam Doe", 
    password: "right@password", 
    email: "test@demo.email",
}; 

let universalArticle;

const consoleLog = console.log;
// console.log = jest.fn();
console.log = consoleLog;
beforeAll( ()=>{
    return DBinitializer(true);
});

afterAll( ()=>{
    return DBconnection.end();
} );

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

describe('(Integration) AUTHENICATION:', () => {
    
    describe('/signup', () => {
        
        // console.log = jest.fn()
        
        describe('POST', () => {
            
            test('should create a new author', async () => {
                
                const res = await request(app)
                .post("/signup")
                .send(universalAuthor);

                console.log(res.statusCode);
                
            expect(res.statusCode).toBe(201);
            
        })
        
        test('should fail with status code 409 for user already exist', async () => {
            
            const res = await request(app)
            .post("/signup")
            .send(universalAuthor);
            
            
            expect(res.statusCode).toBe(409);
            
        })
        
        test('should fail with status code 400 for incomplete user info', async () => {
            
            const res = await request(app)
            .post("/signup")
            .send({name: universalAuthor.name, email: universalAuthor.email});
            
            expect(res.statusCode).toBe(400);
            
        })
        
    })
    
    
    })

    describe('/login', () => {
        
        // console.log = jest.fn()
        
        describe('POST', () => {
            
            test('should succesfully login with statuscode 200', async () => {
                
                const res = await request(app)
                .post("/login")
                .send(universalAuthor);
                
                console.log(res.statusCode);
                
                expect(res.statusCode).toBe(200);
                expect(res.body.token).toBeDefined();
                
                // store the token for furthure use
                universalAuthor.token = res.body.token;
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
                
                const res = await request(app)
                .post("/login")
                .send({email: universalAuthor.email});
                
                
                expect(res.statusCode).toBe(400);
                
            })
            
        })
        
    })
    
})

describe('(Integration) ARTICLE:', () => {
    
    describe('/articles', () => {
        
        console.log = jest.fn()
        
        
        describe('/', () => {
            describe('POST', () => {
                
                test('should be able to create new article and status code should be 201', async () => {
                    const res = await request(app)
                    .post("/articles")
                    .set({"x-access-token":universalAuthor.token})
                    .send(singleArticle);
                    
                    expect(res.statusCode).toBe(201);
                    
                })
                
                test('should return 403 as unable to create new article without access token', async () => {
                    const res = await request(app)
                    .post("/articles")
                    // .set({"x-access-token":universalAuthor.token})
                    .send(singleArticle);
                    
                    expect(res.statusCode).toBe(403);
                    
                })
                
                test('should return 400 as unable to create new article without proper informations', async () => {
                    const res = await request(app)
                    .post("/articles")
                    .set({"x-access-token":universalAuthor.token})
                    .send({title:singleArticle.title});
                    
                    expect(res.statusCode).toBe(400);
                    
                })
                
            })      
            
            describe('GET', () => {            
                
                test('should be able to get everything with 200 as status code', async () => {
                    const res = await request(app).get("/articles").send();
                    universalArticle = res.body[0];
                    console.log(universalArticle);
                    expect(res.statusCode).toBe(200);
                    // expect(res.body).notEmpty();
                })
                
            })
            
            describe('PUT', () => {
                test('should not allow to PUT here', async () => {
                    const res = await request(app)
                    .put("/articles")
                    .send();
                    expect(res.statusCode).toBe(404);
                })
                
            })        
            
            describe('DELETE', () => {
                test('should not allow to DELETE here', async () => {
                    const res = await request(app)
                    .put("/articles")
                    .send();
                    expect(res.statusCode).toBe(404);
                })
                
            })        
        })
        
        describe('/:id', () => {
            describe('POST', () => {
                test('should not allow to POST here', async () => {
                    const res = await request(app)
                    .post("/articles")
                    .send(universalArticle);
                    expect(res.statusCode).toBe(403);
                })
            })      
            
            describe('GET', () => {
                test('should return the article with 200 status code', async () => {
                    const res = await request(app)
                    .get(`/articles/${universalArticle.uuid}`);
                    
                    expect(res.statusCode).toBe(200);
                })
                
            })
            
            describe('PUT', () => {
                test('should update the article with 200 status code', async () => {
                    const res = await request(app)
                    .put(`/articles/${universalArticle.uuid}`)
                    .set({"x-access-token":universalAuthor.token})
                    .send({id:universalArticle.uuid, title: universalArticle.title, description: universalArticle.description, author: "NEW  AUTHOR"});
                    
                    expect(res.statusCode).toBe(200);
                })
                
                test('should not be able to update the article and return with 401 status code', async () => {
                    const res = await request(app)
                    .put(`/articles/${universalArticle.uuid}`)
                    .set({"x-access-token":universalAuthor.token})
                    .send({id:universalArticle.uuid, title: universalArticle.title, description: universalArticle.description, author: "NEW  AUTHOR"});
                    
                    expect(res.statusCode).toBe(401);
                })
        })        
        
        describe('DELETE', () => {
            test('should not be able to delete the article and return with 401 status code', async () => {
                const res = await request(app)
                .delete(`/articles/${universalArticle.uuid}`)
                .set({"x-access-token":universalAuthor.token})
                
                expect(res.statusCode).toBe(401);
            })
        })        
    })
    
    
    })
    
})

