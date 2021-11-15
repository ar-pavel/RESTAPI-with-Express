const convert = require("../utils/converter");
const { randomUUID } = require("crypto");

const ArticleController = (Article) => {
  async function getArticles(req, res) {
    try {
      const data = await Article.findALL();

      res.status(200);
      // return res.send(data);

      convert(res, data);

    } catch (err) {
      // request can't be processed
      console.log(err);
      res.status(500);
      return res.send("Internal Server Error");
    }
  }

  async function deleteArticles(req, res) {
    try {
      // console.log(req.user.username);
      const data = await Article.deleteALL();

      res.status(204);
      return res.send("Deleted");
    } catch (err) {
      // request can't be processed
      console.log(err);
      res.status(500);
      return res.send("Internal Server Error");
    }
  }

  async function getArticleByID(req, res) {
    try {
      console.log("Request params: ", req.params);
      const data = await Article.findByID(req.params.id);

      console.log(data)

      if (data == undefined) {
        console.log("NO DATA")
        return res.status(204).send("No content");
      }

      console.log("Searched data:", data);

      res.status(200);

      convert(res, data);

    } catch (err) {
      // request can't be processed
      console.log(err);
      res.status(500);
      return res.send("Internal Server Error");
    }
  }

  async function updateArticleByID(req, res) {
    try {
      // create article
      const updatedArticle = {
        id: req.param.id,
        title: req.body.title,
        description: req.body.description,
        author: req.user.username,
      };

      console.log("Request params: ", req.params);

      const oldArticle = await Article.findByID(req.params.id);
      console.log("Data found:", oldArticle);

      console.log(oldArticle.author, req.user.username);

      if (oldArticle.author != req.user.username) {
        return res.status(401).send({ message: "Not Authorized" });
      }

      const data = await Article.updateByID(req.params.id, updatedArticle);

      res.status(200);

      convert(res, data);

    } catch (err) {
      // request can't be processed
      console.log(err);

      return res.status(500).send({ message: "Internal Server Error" });
    }
  }

  async function deleteArticleByID(req, res) {
    try {
      const article = await Article.findByID(req.params.id);
      console.log(article);

      console.log(article.author, req.user.username);

      if (article.author != req.user.username) {
        return res.status(401).send({ message: "Not Authorized" });
      }

      const data = await Article.deleteArticleByID(req.params.id);

      return res.status(200).send(data);
    } catch (err) {
      // request can't be processed
      console.log(err);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  }

  async function createArticle(req, res) {
    // request validation
    if (!req.body) {
      return res.status(400).send({
        message: "Content can not be empty!",
      });
    }

    console.log("requested data:", req.body.title);

    if (req.body.title === undefined || req.body.description === undefined) {
      return res.status(400).send({
        message: "Request body needs to be updated!",
      });
    }

    // console.log("Requested by: " + req.user.username);

    // create article
    const article = {
      // uuid: randomUUID(),
      title: req.body.title,
      description: req.body.description,
      author: req.user.username,
    };

    console.log("requested data:", article);

    try {
      const data = await Article.create(article);

      if (data) {
        // return res.status(201).send(data);
        res.status(201);
        convert(res, data);

      } else {
        return res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Article.",
        });
      }
    } catch (err) {
      return res.status(400).send({
        message:
          err.message || "Some error occurred while creating the Article.",
      });
    }
  }

  return {
    getArticles,
    createArticle,
    getArticleByID,
    deleteArticleByID,
    deleteArticles,
    updateArticleByID,
  };
};

module.exports = ArticleController;
