const {Schema,model} = require('mongoose');

const userSchema=new Schema({
    googleId:{
        type:String,
        unique:true
    },
    username:{
        type:String,
        required:true,
        minlength:3,
        maxlength:60,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        maxlength:1024,
    },
    role:{
        type:String,
        enum:["user","manager","admin"],
        default:"user"
    },
    profilePic:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRCJDmi508h1yLx1Dj1BlP-QrJ6-vjX3yuoA&s"
    },
    projects:[
        {
            type:Schema.Types.ObjectId,
            ref:"Project"
        }
    ]
},{timestamps:true});
const User=model("User",userSchema);
module.exports=User;