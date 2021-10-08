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
        
    }); 

    
    
    let prom = new Promise((resolve, reject)=>{
        let sql_query = "create table Authors( email varchar(100) primary key,name varchar(255)not null,password varchar(255) not null )";
        sql.query(sql_query, (err, res)=>{
            if(err){
                console.log("couldn't create table Author");
                reject(err);
            }
            console.log("Author table created");   
            resolve();
        })
    }); 

    prom.then( ()=>{
        let sql_query = "DELIMITER ;;";

        sql.query(sql_query, (err, res)=>{
            if(err){
                return err;
            }
            resolve();
        })
    }).then(()=>{
        let sql_query = "CREATE TRIGGER before_insert_Articles BEFORE INSERT ON Articles FOR EACH ROW BEGIN IF new.uuid IS NULL THEN SET new.uuid = uuid(); END IF; END ;;"

        sql.query(sql_query, (err, res)=>{
            if(err){
                return err;
            }
        })
    }).then( ()=>{
        let sql_query = "DELIMITER ;";

        sql.query(sql_query, (err, res)=>{
            if(err){
                return err;
            }
        })
    }).catch( err => console.log(err));

    console.log("Database Setup Successfull.");

}