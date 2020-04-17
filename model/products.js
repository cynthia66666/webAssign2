const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({ 
    name: {
        type:String,
        required:true
    },
    price: {
        type:Number,
        required:true
    },
    description: {
        type:String,
    },
    category: {
        type:String,
        required:true
    },
    quantity: {
        type:Number,
        required:true
    },
    bestSeller: {
        type:String,
        required:true
    },
    productImg: {
        type:String
    },
    status:{
        type:String,
        default:"Open"
    },
    dataCreated:{
        type:Date,
        default:Date.now()
    }
    
});
const productModel = mongoose.model('Product', productSchema);
module.exports = productModel; 
  