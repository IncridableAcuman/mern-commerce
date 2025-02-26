const {Schema,model} = require('mongoose');

const projectSchema=new Schema({
    title:{
        type:String,
        required:true,
        minlength:2,
        maxlength:30
    },
    description:{
        type:String,
        required:true,
        minlength:5,
        maxlength:300       
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    picture:{
        type:String,
    },
    likeCount:{
        type:Number,
        default:0
    }
},{timestamps:true});
const Project=model("Project",projectSchema);
module.exports=Project;