const express=require('express')
const router=express.Router();
const model = require("../model/product");

router.get("/",(req,res)=>{//need to declare the model const again

    res.render("home",{
        title : "Home",
        data:model.getcate(),
        data1 : model.getbS()
        
    });
});

module.exports=router;