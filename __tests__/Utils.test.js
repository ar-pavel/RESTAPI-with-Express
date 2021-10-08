const FORMAT = require("../utils/converter");

const {singleArticle, articles}  = require("../__mocks__/Mocks")

describe('util/converter', ()=>{

    test('should return the stringyfied data from json (single object)', () => {
        // console.log(singleArticle);
        expect(FORMAT(singleArticle).json()).toBe(JSON.stringify(singleArticle)); 
    });
    
    test('should return the stringyfied data from json (array of objects)', () => {
        // console.log(singleArticle);
        expect(FORMAT(articles).json()).toBe(JSON.stringify(articles)); 
    });
    
    
    test('should convert the data to HTML from json (single object)', async () => {

        const shouldbe =  '<table>' 
                    + '<thead>'
                        + '<tr>'
                            + '<th>title</th>'
                            + '<th>description</th>'
                            + '<th>author</th>'
                        + '</tr>'
                    + '</thead>'
                    + '<tbody>' 
                        + '<tr>'
                            + '<td>' + singleArticle.title + '</td>'
                            + '<td>' + singleArticle.description + '</td>'
                            + '<td>' + singleArticle.author + '</td>'
                        + '</tr>'
                    + '</tbody>';

            // console.log(FORMAT(singleArticle).html());
        
        expect(FORMAT(singleArticle).html()).toBe(shouldbe);

    }); 
    
    test('should convert the data to XML from json (arrya of objects)', async () => {

        const shouldbe =  '<root>'                    
        + articles.map( (article) => {
            let keys = Object.keys(article);

            return '<row>' + 
                        keys.map(key => {
                            return `<${key}>` + article[key] + `</${key}>` 
                            
                        })+
                    '</row>' ;

        }).join('') 
        + '</root>';
        
        expect(FORMAT(articles).xml()).toBe(shouldbe);

    });
        
});
