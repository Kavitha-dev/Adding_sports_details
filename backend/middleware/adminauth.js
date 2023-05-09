const config = require('config');
const jwt= require('jsonwebtoken')

function adminauth(req,res,next){
    const token=req.header('x-auth-token'); // this is fetch from header and x-auth-token this is the header value we want check for token

    //Check for token
    
    if(!token) // that is x-auth-token
    return res.status(401).json({msg:'No token, authorization denied'});
  
    try{
    
        //Verify token
        const decoded = jwt.verify(token, config.get('jwtSecret'))
      
        //Add user from payload
        req.admin = decoded;
        next();

   }catch(e){
    res.status(400).json({msg:'Token is not valid'})
   }
}

module.exports= adminauth;