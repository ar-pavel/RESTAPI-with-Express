const mysql = require("mysql");

const dbConfig = require("../config/DBconfig.js")

var connection = mysql.createPool({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    connectionLimit: 100,
});

/* 

    `CREATE TABLE IF NOT EXISTS "Article" (
	    "id" SERIAL,
	    "title" VARCHAR(100) NOT NULL,
	    "description" VARCHAR(300) NOT NULL,
        "author" VARCHAR(30) NOT NULL,
	    PRIMARY KEY ("id")
    );`

    CREATE TABLE Articles (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(120),description VARCHAR(255), author VARCHAR(50))

*/

module.exports = connection;