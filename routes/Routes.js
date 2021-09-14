const express = require('express');
const Article = require('../model/Article');
const router = express.Router();

const articleController = require("../controller/ArticleController")


router.get("/", (req, res)=> {
    res.json("HELLO from EXPRESS!");
});


router.get("/articles", articleController.getArticles );
router.post("/articles", articleController.createArticle );
router.get("/articles/:title", articleController.getArticleByTitle);
router.delete("/articles/:title", articleController.deleteArticleByTitle);
router.delete("/articles", articleController.deleteArticles);


module.exports = router;