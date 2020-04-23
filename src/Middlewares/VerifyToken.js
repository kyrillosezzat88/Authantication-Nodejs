const Jwt = require('jsonwebtoken');


const authToken = async (req,res, next) => {
    const token = req.header('auth-token');
    if(!token){
        return res.status(400).send('Access Denied');
    }
    try{
        const verified = await Jwt.verify(token , process.env.SCRETE_TOKEN);
        req.user = verified;
        next();
    }catch(err) {
        res.status(400).send({Error:err.message});
    }
}
module.exports = authToken;