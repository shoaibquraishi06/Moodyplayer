require('dotenv').config();
const mongoose  = require('mongoose');


function connectDB() {
    mongoose.connect(process.env.MONGODB_URL )
    .then(()=>{
         console.log('MongoDB connected successfully');        
    }).catch((err)=>{
 
         console.log('MongoDB connection failed', err);
         
    });


}
module.exports = connectDB


