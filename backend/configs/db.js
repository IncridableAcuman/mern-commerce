const mongoose=require('mongoose');

module.exports=()=>{
    mongoose.connect('mongodb://localhost/platform').then(()=>{
        console.log("MongoDB connected successfully");
    }).catch((er)=>{
        console.log("MongoDB connection failed.Something went wrong!",er);
    })
}