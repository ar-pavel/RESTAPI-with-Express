const express = require('express');
const Article = require('../model/Article');
const router = express.Router();

// const articleController = require("../controller/ArticleController")
const articleController = require("../controller/ArticleController")(Article);


router.get("/", (req, res)=> {
    res.json("HELLO from EXPRESS!");
});

router.all("/articles", (req, res, next) => {
    res.setHeader("Request-Time", new Date());
    next();
})

router.get("/articles", articleController.getArticles );
router.post("/articles", articleController.createArticle );
router.get("/articles/:title", articleController.getArticleByTitle);
router.put("/articles/:title", articleController.updateArticleByTitle);
router.delete("/articles/:title", articleController.deleteArticleByTitle);
router.delete("/articles", articleController.deleteArticles);


module.exports = router;