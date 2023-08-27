var jwt = require('jsonwebtoken');

// Middleware to check headers before each REST call
const checkHeadersMiddleware = (req, res, next) => {
    
    if(req.headers.token){
        var decodedtoken = jwt.verify(req.headers.token, 'mySecretKey');
        console.log(decodedtoken);
        
        if(decodedtoken == null){
            return res.status(400).json({ error: `Wrong session` });
        }
        console.log(decodedtoken.email);
        req.email = decodedtoken.email;
    }else{
        return res.status(400).json({ error: `Missing required headers` });
    }
    next();
  };
  
module.exports = checkHeadersMiddleware;