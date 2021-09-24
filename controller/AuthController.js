const AuthController = (Author, jwt, bcrypt) => { 

    async function signin(req, res){
        try{

            // Validate user input
            if (req.body.email===undefined || req.body.password===undefined) {
                return res.status(400).send("All inputs are required");
            }
            // Get user input
            const { email, password } = req.body;
            

            // Validate if user exist in our database
            const author = await Author.getAuthor(email);


            if (author && (await bcrypt.compare(password, author.password))) {
                // sign/generate JWT token for this author
                console.log("Credential matched.")
                const token = jwt.sign(
                    {
                        username: author.name, 
                        email: author.email
                    }, 
                    process.env.ACCESS_TOKEN_SECRET,
                    { 
                        algorithm: "HS256",
                        expiresIn: process.env.ACCESS_TOKEN_LIFE
                    }
                );


                // send token as body parameter
                author.token = token;
            
                // send token as cookie 
                res.cookie("jwt", token, {secure: true, httpOnly: true})

                // user
                return res.status(200).json(author);
            }else{
                
                return res.status(401).send("Invalid Credentials");
            }
                
        }catch(error){
            console.log(error);
            return res.status(500).send("Internal server error");
        }

    }
   
    async function signup(req, res){

        try{

            // Validate user input
            if (req.body.email===undefined || req.body.password===undefined || req.body.name===undefined) {
                return res.status(400).send("All inputs are required");
            }

            let author = { name:req.body.name, password: req.body.password, email: req.body.email};
            
            author.email = author.email.toLowerCase(); 

            console.log("request data: " + JSON.stringify(author));

            
            // check if user already exist
            // Validate if user exist in the database
            const oldUser = await Author.getAuthor(author.email);

            if(oldUser){
                return res.status(409).send("User Already Exist. Please Login");
            }


            //Encrypt user password
            
            encryptedPassword = await bcrypt.hash(author.password, 10);

            author.password=encryptedPassword;

            // console.log("Hashed password: " + encryptedPassword);

            const data = await Author.create(author);
            // console.log("Author created data:", data);

            
            // sign/generate JWT token for this author
            const token = jwt.sign(
                {
                    username: author.name, 
                    email: author.email
                }, 
                process.env.ACCESS_TOKEN_SECRET,
                { 
                    algorithm: "HS256",
                    expiresIn: process.env.ACCESS_TOKEN_LIFE
                }
            );

            // console.log("JWT TOKEN : " + token);
            
            // send token as body parameter
            author.token = token;
            
            // send token as cookie 
            res.cookie("jwt", token, {secure: true, httpOnly: true})
            return res.status(201).send(author);

        }catch(error){
            // console.log(error);
            return res.status(500).send("Internal server error");
        }

    }


    return { signin, signup};
};


module.exports = AuthController;