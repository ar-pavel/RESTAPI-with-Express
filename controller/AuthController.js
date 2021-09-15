const AuthController = (Author, jwt, bcrypt) => { 

    async function signin(req, res){
        try{

            // Get user input
            const { email, password } = req.body;
            
            // Validate user input
            if (!(email && password)) {
                res.status(400).send("All input is required");
            }

            // Validate if user exist in our database
            const author = await Author.getAuthor(email);

            if (author && (await bcrypt.compare(password, user.password))) {
                // // Create token
                const token = jwt.sign(
                    { username: auth.name, email },
                    process.env.TOKEN_KEY,
                    {
                    expiresIn: "24h",
                    }
                );

                // save user token
                user.token = token;

                // user
                res.status(200).json(user);
            }

            res.status(400).send("Invalid Credentials");

        }catch(error){
            console.log(error);
            return res.status(500).send("Internal server error");
        }

    }
   
    async function signup(req, res){

        try{

            let author = { name:req.body.name, password: req.body.password, email: req.body.email};
            
            author.email = author.email.toLowerCase(); 

            console.log("request data: " + JSON.stringify(author));

            // Validate user input
            if (!(author.email && author.password && author.name)) {
                res.status(400).send("All inputs are required");
            }
            
            // check if user already exist
            // Validate if user exist in the database
            const oldUser = await Author.getAuthor(author.email);

            if(oldUser){
                return res.status(409).send("User Already Exist. Please Login");
            }


            //Encrypt user password
            
            encryptedPassword = await bcrypt.hash(author.password, 10);

            author.password=encryptedPassword;

            console.log("Hashed password: " + encryptedPassword);

            const data = await Author.create(author);
            console.log("Author created data:", data);

            
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

            console.log("JWT TOKEN : " + token);
            
            // send token as body parameter
            author.token = token;
            
            // send token as cookie 
            res.cookie("jwt", token, {secure: true, httpOnly: true})
            res.send(author);

        }catch(error){
            console.log(error);
            return res.status(500).send("Internal server error");
        }

    }


    return { signin, signup};
};


module.exports = AuthController;