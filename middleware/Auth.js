const Auth = (jwt)=> {

    async function verifyToken(req, res, next){

        const token = req.body.token || req.header.token || req.headers["x-access-token"];

        console.log("body:",req.body.token ,"query:", req.query.token ,"header:", req.headers["x-access-token"]);

        console.log(token);

        if(!token)
            return res.status(403).send("A token is required for authentication");

        
            // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=> {
                //     if(err){
                    //         console.log(err);
                    //         console.log("token invalid")
                    //     }
                    //     console.log({Decoded: decoded});
                    // })            
                    
        try{
            console.log("verifying token...")
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);    
            console.log({decoded: decoded});
            req.user = decoded;

        }catch(error){
            console.log(error);
            return res.status(401).send("Invalid Token");
        }

        return next();
    } 
    return verifyToken;
}

module.exports = Auth;