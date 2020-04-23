const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const router = require('./src/Routes/authRouter')
// variables 
const Port = process.env.PORT || 4000;
const MongoUrl = process.env.MONGODB_URI;


//connection to mongodb 
mongoose.connect(MongoUrl,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
});
mongoose.connection.once('connected' , () => console.log('Mongodb Connected Succesfully')).on('error' , (err) => console.log({Error:err}));

// use Middelwares 
app.use(express.json());
 
// routes 
app.use('/api/user' , router);

app.listen(Port , () => console.log(`Server is Ready on Port ${Port}`));
