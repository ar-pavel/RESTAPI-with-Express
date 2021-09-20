const Article = require('../model/Article');
const Author = require('../model/Author');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

const articleController = require("../controller/ArticleController")(Article);
const authController = require("../controller/AuthController")(Author, jwt, bcrypt)
const auth = require("../middleware/Auth")(jwt);


router.get("/", auth, (req, res)=> {
    res.json("HELLO from EXPRESS!");
});

router
    .route("/articles")
    .all((req, res, next) => {
        res.setHeader("Request-Time", new Date());
        next();
    })
    .get(articleController.getArticles )
    .post(auth, articleController.createArticle )
    .delete(auth, articleController.deleteArticles);

router
    .route("/articles/:id") 
    .all((req, res, next) => {
        res.setHeader("Request-Time", new Date());
        next();
    })  
    .get(articleController.getArticleByID)
    .put(auth, articleController.updateArticleByID)
    .delete(auth, articleController.deleteArticleByID);


router
    .route("/login")
    .all((req, res, next)=>{

        next();
    })
    .post(authController.signin)

router
    .route("/signup")
    .all((req, res, next) => {
        
        next();
    })
    .post(authController.signup);


router.use("*", (req, res) => {
    res.status(404).json({
        success: "false",
        message: "Page not found",
        error: {
            statusCode: 404,
            message: "You reached a route that is not defined on this server",
        },
    });
});

module.exports = router;