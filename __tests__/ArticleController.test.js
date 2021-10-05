const ArticleController = require("../controller/ArticleController");
const Article = require("../model/Article");
const {res, req} = require("../__mocks__/Mocks")

const articleController = require("../controller/ArticleController")(Article);

// mocking all functionalities of Article
Article.findALL = jest.fn();
Article.findByID = jest.fn();
Article.create = jest.fn();
Article.deleteArticleByID = jest.fn();

// clearing mock call counts etc.
afterAll(() => {
    jest.clearAllMocks();
});
  

describe('Article controller unit test', () => {
    

    test('should get all articles', async () => {       

        const data = await articleController.getArticles(req, res);

        expect(Article.findALL).toHaveBeenCalledTimes(1);
    })
    
    test('should be able to find by valid ID', async () => {
        const data = await articleController.getArticleByID(req, res);

        expect(Article.findByID).toHaveBeenCalledTimes(1)
        expect(Article.findByID).toHaveBeenCalledWith(req.params.id)
    })

    test('should not create article without proper body', async () => {
        const data = await articleController.createArticle(req, res);
        expect(Article.create).toHaveBeenCalledTimes(0)
    })

    test('should not be able to delete without proper authorization', async () => {
        const  data = await articleController.deleteArticleByID(req, res)
      
        expect(Article.deleteArticleByID).toHaveBeenCalledTimes(0)

    })
         
    
    
})