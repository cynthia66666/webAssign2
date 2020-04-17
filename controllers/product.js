const express=require('express')
const router=express.Router();
//load product model
const productModel = require("../model/Products");
const path = require("path");
router.get("/add",(req,res)=>{
    res.render("Product/productAdd");
});
router.post("/add",(req,res)=>
{
    const newProduct = {
        name : req.body.name,
        price : req.body.price,
        description : req.body.description,
        category : req.body.category,
        quantity : req.body.quantity,
        bestSeller : req.body.bestSeller,
    }

    const product = new productModel(newProduct);
    product.save()
    .then(()=>{
       
                res.redirect(`/product/list`);
            })
    .catch(err=>console.log(`Error happened when inserting in the database:${err}`));
   
});

router.get("/list",(req,res)=>{
    res.render("Product/productDashboard");
});




module.exports=router;