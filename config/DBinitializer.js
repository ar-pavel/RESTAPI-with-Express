const sql = require("../model/DB");

module.exports = async (reset=false)=>{
    
    if(reset){
        // if the reset flag is passed then drop the db 
        // and crate a new one
        let sql_query = "DROP TABLE IF EXISTS Articles";
        sql.query(sql_query, (err, res)=>{
            if(err){
                console.log("couldn't drop table Articles");
                console.log(err);
            }
            console.log("Articles table droped");                    
        });

        sql_query = "DROP TABLE IF EXISTS Authors";
        sql.query(sql_query, (err, res)=>{
            if(err){
                console.log("couldn't drop table Authors");
                console.log(err);
            }
            console.log("Authors table droped");                    
        });
    }

    // create the tables if not exist 

    let sql_query = "CREATE TABLE Articles (uuid char(36) NULL,title varchar(100) NOT NULL, description varchar(500) NOT NULL, author varchar(100) NOT NULL );";
    sql.query(sql_query, (err, res)=>{
        if(err){
            console.log("couldn't create table Articles");
            console.log(err);
        }
        console.log("Articles table created");   
        
        let qry = "DELIMITER ;;"
        
    }); 

    
    sql_query = "create table Authors( email varchar(100) primary key,name varchar(255)not null,password varchar(255) not null )";
    sql.query(sql_query, (err, res)=>{
        if(err){
            console.log("couldn't create table Author");
            console.log(err);
        }
        console.log("Author table created");   
                
    });

    return "Database Setup Successfull.";

}