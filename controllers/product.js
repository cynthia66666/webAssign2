const express=require('express')
const router=express.Router();
//load product model
const model = require("../model/product");
/*
router.get("/",(req,res)=>{

    res.render("product",{ //same name with the name of the handlebars
        title : "Product",
        data : model.getAllProduct()
       // data : model.product.getAllProduct()
    });
});
*/

module.exports=router;