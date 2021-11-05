const sql = require("./DB");

// constructor
const Article = function (article) {
  this.uuid = article.id;
  this.title = article.title;
  this.description = article.description;
  this.author = article.author;
};

const articles = [
  {
    title: "A day to remember",
    description:
      "Pregato vostro che manifestamente dio a oppinione di, tal principio cosa potra cosí di allo, riguardando siamo le e nel.",
    author: "Willam Doe",
  },
  {
    title: "What a wonderful day to die",
    description:
      "De et des lieues vu pensif. Lâche ni cheveux aux et ma peaux. Je puis l'éther des sont ni hystériques, un sont baigné triques melant.",
    author: "Jhon Scott",
  },
];

Article.create = (article) => {
  return new Promise((resolve, reject) => {
    sql.query("INSERT INTO Articles SET ?", article, (err, res) => {
      if (err) {
        // handle the error
        console.log("Unable to create article ", article, err);
        return reject(err);
      }

      // request success
      console.log("created article: ", { res: res, ...article });
      return resolve({ ...article });
    });
  });
};

Article.findByID = (id) => {
  return new Promise((resolve, reject) => {
    console.log("searching with id : " + id);

    sql.query(`SELECT * FROM Articles WHERE uuid = ?`, id, (err, res) => {
      if (err) {
        // handle the error
        console.log("Error happened finding :", id, err);
        return reject(err);
      }

      // request success
      console.log("article found: ", { res: res });
      return resolve(res[0]);
    });
  });
};

Article.updateByID = (id, article) => {
  return new Promise((resolve, reject) => {
    console.log("updating with id : " + id, "and body :", article);

    sql.query(
      "UPDATE Articles SET title = ?, description = ?, author = ? WHERE uuid = ?",
      [article.title, article.description, article.author, id],
      (err, res) => {
        if (err) {
          // handle the error
          console.log("Error occured while updating :", id, err);
          return reject(err);
        }

        // request success
        console.log("article updated: ", { res: res });
        return resolve(article);
      }
    );
  });
};

Article.deleteArticleByID = (id) => {
  return new Promise((resolve, reject) => {
    console.log("deleting with id : '" + id);

    sql.query(`DELETE FROM Articles WHERE uuid = ?`, id, (err, res) => {
      if (err) {
        // handle the error
        console.log("Error happened deleting :", id, err);
        return reject(err);
      }

      // request success
      console.log("article deleted: ", { res: res });
      return resolve("Deleted");
    });
  });
};

Article.findALL = () => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT * FROM Articles", (err, res) => {
      if (err) {
        // handle the error
        console.log("Unable to retrive articles ", err);
        return reject(err);
      }

      console.log("Retrived Articles:\n", res);

      // res = res.map((article)=>{return {title: article.title, description: article.description, author:article.author }})

      return resolve(res);
    });
  });
};

Article.deleteALL = (author) => {
  return new Promise((resolve, reject) => {
    console.log("deleting all the article owned by:", author);

    sql.query("DELETE FROM Articles", (err, res) => {
      if (err) {
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

// create table Articles(
//     title varchar(100) primary key,
//     description varchar(500)not null,
//     author varchar(100) not null
// )

/*
// create mysql table using these commands 

CREATE TABLE Articles (
    uuid char(36) NULL,
    title varchar(100) NOT NULL,
    description varchar(500) NOT NULL,
    author varchar(100) NOT NULL 
);

DELIMITER ;;
CREATE TRIGGER before_insert_Articles
BEFORE INSERT ON Articles
FOR EACH ROW
BEGIN
  IF new.uuid IS NULL THEN
    SET new.uuid = uuid();
  END IF;
END
;;


*/
