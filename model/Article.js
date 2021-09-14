const sql = require("./DB");


// constructor
const Article = function(article){
  this.title = article.title;
  this.description = article.description;
  this.author = article.author;
}

const articles = [{
  title: "A day to remember",
  description: "Pregato vostro che manifestamente dio a oppinione di, tal principio cosa potra cosí di allo, riguardando siamo le e nel.",
  author: "Willam Doe"
}, 
{
  title: "What a wonderful day to die",
  description: "De et des lieues vu pensif. Lâche ni cheveux aux et ma peaux. Je puis l'éther des sont ni hystériques, un sont baigné triques melant.",
  author: "Jhon Scott"
}];


Article.create = (article) => {
  return new Promise( (resolve, reject) => {
    

     // temporary code starts here
     console.log("data requested to be saved:", article)
     articles.push(article);
     return resolve(article);
     // temporary code ends here

    sql.query("INSERT INTO Articles SET ?", article, (err, res)=> {
      if(err){
        // handle the error
        console.log("Unable to create article ", article, err);
        return reject(err);
      }

      // request success
      console.log("Created article : ", res);
      return resolve(res);

    });
  });
};

Article.findALL =  () => {
  return new Promise((resolve, reject) => {
    
    // temporary code starts here
    return resolve(articles);
    // temporary code ends here

    sql.query("SELECT * FROM Articles", (err, res)=> {
      if(err){
        // handle the error
        console.log("Unable to retrive articles ", err);
        return reject(err);
      }

      console.log("Retrived Articles:\n", res);
      return resolve(res);
    });
  });
};

module.exports = Article;