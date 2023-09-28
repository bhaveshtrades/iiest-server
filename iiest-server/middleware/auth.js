//Middleware for authorization and authentication

const jwt = require('jsonwebtoken');
const auth = JSON.parse(process.env.AUTH);
const JWT_SECRET = auth.JWT_TOKEN;

const authMiddleware = (req, res, next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error: 'Please authenticate using a valid token'});
    }
    try {
        jwt.verify(token,  JWT_SECRET);
        // req.user = data.employee_user;
        next();
    } catch (error) {
        res.status(401).send({error: 'Please authenticate using a valid token'});
    }
}

module.exports = authMiddleware;