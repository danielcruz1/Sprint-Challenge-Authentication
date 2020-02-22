/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.headers.authorization
    if(token){
        const secret = process.env.JWT_SECRET

        jwt.verify(token, secret, (error, decodedToken) => {
            if(error){
                res.status(401).json({message: `This token is broken.`})
            }
            else{
                res.decodeJwt = decodedToken;
                next();
            }
        })
    }
    else{
        res.status(400).json({ message: '400 - Bad Request' });
    }
} 
