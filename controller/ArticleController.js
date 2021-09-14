
const Article = require("../model/Article")

async function getArticles(req, res) { 
    try{
        const data = await Article.findALL();
        
        res.status(200);
        return res.send(data);
        
    }catch(err){
        // request can't be processed
        console.log(err);
        res.status(500);
        return res.send("Internal Server Error");
    }
}

async function createArticle(req, res) {
        
    // request validation
    if(!req.body){
        return res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log("requested data:",req.body.title);
    
    if(!req.body.title || !req.body.description || !req.body.author){
         return res.status(400).send({
            message: "Request body needs to be updated!"
        });
    }
    
    // create article
    const article = {
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
    };
    
    console.log("requested data:", article);

    // save to database 
    try{
        const data  = await Article.create(article);
        if(data){
            return res.status(201).send(data);
        } 
        return res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Article."
        });
        
    }catch(err){
        return res.status(400).send({
            message:
            err.message || "Some error occurred while creating the Article."
        });
    }
    
}

module.exports = {getArticles, createArticle}

