const express=require('express')
const router=express.Router();
const model = require("../model/product");

router.get("/",(req,res)=>{//need to declare the model const again

    res.render("general/home",{
        title : "Home",
        data:model.getcate(),
        data1 : model.getbS()
        
    });
});

router.get("/product",(req,res)=>{

    res.render("general/product",{ //same name with the name of the handlebars
        title : "Product",
        data : model.getAllProduct()
       // data : model.product.getAllProduct()
    });
}); 

module.exports=router;