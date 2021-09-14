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

    sql.query("INSERT INTO Articles SET ?", article, (err, res)=> {
      if(err){
        // handle the error
        console.log("Unable to create article ", article, err);
        return reject(err);
      }
      
      // request success
      console.log("created article: ", { id: res.insertId, ...article });
      return resolve({ id: res.insertId, ...article });

    });
  });
};

Article.findByTitle = (title) => {
  return new Promise( (resolve, reject) => {

      console.log("searching with title : "+title);

    sql.query(`SELECT * FROM Articles WHERE title = ${title}`,  (err, res)=> {
      if(err){
        // handle the error
        console.log("Error happened finding :", title, err);
        return reject(err);
      }
      
      // request success
      console.log("article found: ", { res: res.affectedRows });
      return resolve({"Total delected" : res.affectedRows});

    });
  });
};

Article.deleteArticleByTitle = (title) => {
  return new Promise( (resolve, reject) => {

      console.log("deleting with title : '"+title+"'");

    sql.query(`DELETE FROM Articles WHERE title = ${title}`,  (err, res)=> {
      if(err){
        // handle the error
        console.log("Error happened deleting :", title, err);
        return reject(err);
      }
      
      // request success
      console.log("article deleted: ", { res: res });
      return resolve(res);

    });
  });
};

Article.findALL =  () => {
  return new Promise((resolve, reject) => {
    
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

Article.deleteALL =  () => {
  return new Promise((resolve, reject) => {
    
    sql.query("DELETE FROM Articles", (err, res)=> {
      if(err){
        // handle the error
        console.log("Unable to delete articles ", err);
        return reject(err);
      }

      console.log("Deleted all Articles:\n", res);
      return resolve(res);
    });
  });
};

module.exports = Article;