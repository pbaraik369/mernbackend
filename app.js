const dotenv = require('dotenv');
const express = require('express');
const app = express();
dotenv.config({path:'./config.env'})
require('./db/conn');
const usersSchema = require('./model/userSchema');

const PORT = process.env.PORT;
app.use(express.json())
app.use(require('./router/route'));


app.get('/',(req,res)=>{

    res.send("hello buddy how are you?");

})


app.listen(PORT,()=>{
    console.log( `server connected successfully at ${PORT}`);
})