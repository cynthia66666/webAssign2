const express=require('express')
const router=express.Router();


router.get("/",(req,res)=>{

    res.render("home",{
        title : "Home",
        data:model.getcate(),
        data1 : model.getbS()
        
    });
});

module.exprorts=router;