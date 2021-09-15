const sql = require("./DB");

// constructor
const Author = function(author){
    this.email = author.email;
    this.name = author.name;
    this.password = author.password;
}


Author.getAuthor = (email)=>{
    return new Promise( (resolve, reject) => {

        console.log("searching with email : "+email);
        
        sql.query(`SELECT * FROM Authors WHERE email=?`,email,  (err, res)=> {
            if(err){
                // handle the error
                console.log("Error happened finding :", email, err);
                return reject(err);
            }
            
            // request success
            console.log("autor found: ", { author: res });
            return resolve(res);
    
        });
    });
}

Author.create = (author) => {
    return new Promise( (resolve, reject) => {

        sql.query("INSERT INTO Authors SET ?", author, (err, res)=> {
          if(err){
            // handle the error
            console.log("Unable to create article ", author, err);
            return reject(err);
          }
          
          // request success
          console.log("created author: ", { id: res.insertId, ...author });
          return resolve({ id: res.insertId, ...author });
    
        });
      });

};

module.exports = Author;

// create table Authors(
//     email varchar(100) primary key,
//     name varchar(255)not null,
//     password varchar(255) not null 
// )