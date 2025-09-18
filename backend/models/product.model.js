const { Schema, model }=require("mongoose");

const productSchema=new Schema({
    title:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    },
    content:{
        type:String,
        required:true,
        minlength:15,
        maxlength:100
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true,
        enum:["Salad","Rolls","Deserts","Sandwich","Cake","PureVeg","Pasta","Noodles"]
    }
},{timestamps:true});
const Product=model("Product",model("Product",productSchema));
module.exports=Product;