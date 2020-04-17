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
        status:req.body.status
    }

    const product = new productModel(newProduct);
    product.save()
    .then(()=>{
       
                res.redirect('/product/list');
            })
    .catch(err=>console.log(`Error happened when inserting in the database:${err}`));
   
});

router.get("/list",(req,res)=>{
    //pull from the database, get the results that was returned and 
    //then inject that results into the productDashboard
    productModel.find()
    .then((products)=>{
        //Filter out the information that you want from the arrary
        //of documents that was returned into a new array

        //the call up function will be executed as many times as
        //how many arrarys of documents there
        const filteredProduct=products.map(product=>{
            return {
                id:product._id,
                name:product.name,
                price:product.price,
                description:product.description,
                category:product.category,
                quantity:product.quantity,
                bestSeller:product.bestSeller,
                status:product.status,
                productImg:product.productImg
            }
        });


        res.render("Product/productDashboard",{
            data:filteredProduct
        });
    })
    .catch(err=>console.log(`Error happened when pulling from the database:${err}`));

});




module.exports=router;