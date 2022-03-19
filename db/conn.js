const mongoose = require('mongoose');

const dATA_URL= process.env.DATABASE;
mongoose.connect(dATA_URL,()=>{
    console.log('database connected successfully');
});