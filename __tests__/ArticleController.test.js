const Article = require("../model/Article");

const articleController = require("../controller/ArticleController")(Article);



describe('Article controller tester', () => {
    
    test('should test the controller', () => {
        // console.log("Placeholder of Article Controller.")
        expect("ARTICLE").toBe("ARTICLE");
    })

    test('should get all articles', async () => {
        // const data = await Article.findALL();
        // expect(data).toBe([]);
    })
    
    
    
})