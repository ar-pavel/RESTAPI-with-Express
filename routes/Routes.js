const express = require('express');
const Article = require('../model/Article');
const router = express.Router();

const articleController = require("../controller/ArticleController")


router.get("/", (req, res)=> {
    res.json("HELLO from EXPRESS!");
});


router.get("/articles", articleController.getArticles );
router.post("/articles", articleController.createArticle );


module.exports = router;