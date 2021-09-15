
const ArticleController = (Article) => { 

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
    
    async function deleteArticles(req, res) { 
        try{
            console.log(req.user.username);
            const data = await Article.deleteALL(req.user.username);
            
            res.status(204);
            return res.send(data);
            
        }catch(err){
            // request can't be processed
            console.log(err);
            res.status(500);
            return res.send("Internal Server Error");
        }
    }
    
    async function getArticleByTitle(req, res) { 
        try{
            const data = await Article.findByTitle(req.params.title);
            
            res.status(200);
            return res.send(data);
            
        }catch(err){
            // request can't be processed
            console.log(err);
            res.status(500);
            return res.send("Internal Server Error");
        }
    } 
    
    async function updateArticleByTitle(req, res) { 
        try{
              // create article
            const article = {
                title: req.body.title,
                description: req.body.description,
                author: req.body.author,
            };

            const tmp = await Article.findByTitle(req.params.title);
            console.log("Data found:", tmp);

            console.log(article.author, req.user.username)

            if(article.author != req.user.username){
                return res.status(401).send({message : "Not Authorized"});
            }


            const data = await Article.updateByTitle(req.params.title, article);
            
            return res.status(200).send(data);
         
            
        }catch(err){
            // request can't be processed
            console.log(err);
            
            return res.status(500).send({message:"Internal Server Error"});
        }
    }
    
    async function deleteArticleByTitle(req, res) { 
        try{
            
            const article = await Article.findByTitle(req.params.title);
            console.log(article);

            console.log(article.author, req.user.username)

            if(article.author != req.user.username){
                return res.status(401).send({message : "Not Authorized"});
            }

            const data = await Article.deleteArticleByTitle(req.params.title);
            
            
            return res.status(200).send(data);
            
        }catch(err){
            // request can't be processed
            console.log(err);
            return res.status(500).send({message: "Internal Server Error"});
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
        
        if(!req.body.title || !req.body.description){
            return res.status(400).send({
                message: "Request body needs to be updated!"
            });
        }

        // console.log("Requested by: " + req.user.username);
        
        // create article
        const article = {
            title: req.body.title,
            description: req.body.description,
            author: req.user.username,
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
    
    return {getArticles, createArticle, getArticleByTitle, deleteArticleByTitle, deleteArticles, updateArticleByTitle};
};

module.exports = ArticleController