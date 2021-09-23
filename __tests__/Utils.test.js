const FORMAT = require("../utils/converter");

const {singleArticle, articles}  = require("../__mocks__/Mocks")

describe('util/converter', ()=>{

    test('should return the stringyfied data from json (object)', () => {
        // console.log(singleArticle);
        expect(FORMAT(singleArticle).json()).toBe(JSON.stringify(singleArticle)); 
    });
    
    test('should return the stringyfied data from json (array of objects)', () => {
        // console.log(singleArticle);
        expect(FORMAT(articles).json()).toBe(JSON.stringify(articles)); 
    });
    
    
    test('should convert the data to HTML from json', async () => {
        
    });
});
