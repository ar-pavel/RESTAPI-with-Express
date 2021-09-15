const Article = require('../model/Article');
const router = require('express').Router();

const articleController = require("../controller/ArticleController")(Article);


router.get("/", (req, res)=> {
    res.json("HELLO from EXPRESS!");
});

router
    .route("/articles")
    .all((req, res, next) => {
        res.setHeader("Request-Time", new Date());
        next();
    })
    .get(articleController.getArticles )
    .post(articleController.createArticle )
    .delete(articleController.deleteArticles);

router
    .route("/articles/:title") 
    .all((req, res, next) => {
        res.setHeader("Request-Time", new Date());
        next();
    })  
    .get( articleController.getArticleByTitle)
    .put( articleController.updateArticleByTitle)
    .delete(articleController.deleteArticleByTitle);

module.exports = router;