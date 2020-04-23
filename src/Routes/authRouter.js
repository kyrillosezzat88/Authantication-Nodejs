const router = require('express').Router();
const user = require('../models/auth_model');
const mongoose = require('mongoose');
const users = mongoose.model('user');
const {RegValidations , LoginValidations}  = require('../Validations/Validations')
const bcrypt = require('bcryptjs');
const Jwt = require('jsonwebtoken');
const veryfiyToken = require('../Middlewares/VerifyToken')
//Rgistration Router

router.post('/register' , async (req , res) => {
    const {name , email , password} = req.body;
    const {error} = await RegValidations(req.body);
    if(error){
        return res.status(400).send({Error : error.details[0].message});
    }
    // check newuser if in our database or not
    const isExist = await users.findOne({email});
    if(isExist){
        return res.status(400).send({Error: `your Email ${email} exist`});
    }
    //hashed password 
    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(password , salt);
    // create new user with hashing passwrod 
    const newUser = new user({name , email , password:hasedPassword});
    try{
        const SavedUser = await newUser.save();
        res.send(SavedUser);
    }catch(err){
        res.status(400).send({Error:err.message});
    }
});



//Login Router 
router.post('/login' , async (req , res ) => {
    //check it user found or  not on our database
    const {email , password} = req.body; 
    //Login validations 
    const {error} = await LoginValidations(req.body);
    if(error){
        return res.status(400).send({Error:'Invaled Email or password '});
    }
    const user = await users.findOne({email});
    if(!user){
        return res.status(400).send({Error : 'email or password is wrong'});
    }
    //check password is correct or not 
    const validPass = await bcrypt.compare(password , user.password);
    if(!validPass){
        return res.status(400).send({Error:'email or password is wrong'});
    }
    // Now you are loged in :)

    //create token using jwt 
    const token = Jwt.sign({userID:user._id} , process.env.SCRETE_TOKEN);
    res.header('auth-token' , token).send({Token:token});
})

//Posts Router to Get user posts 
router.get('/posts', veryfiyToken , (req , res ) => {
    res.json({
        title:'First Post',
        Description:'Post Body'
    });
})


module.exports = router;