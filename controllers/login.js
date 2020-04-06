const express=require('express')
const router=express.Router();

router.get("/",(req,res)=>{//no need to repeat the route again
   
    res.render("login",{
        title : "login",
        
    });
});


router.post("/",(req,res)=>{
    const errornm=[];
    const errorpw=[];
    if(req.body.signinEmail=="")
    {
        errornm.push("Please enter your email");
    }
    if(req.body.signinPassword=="")
    {
        errorpw.push("Please enter your password");
    }
    if(errornm.length>0||errorpw.length>0)
    {
        res.render("login",{
            title: "Login Page",
            nmerror:errornm,
            pwerror:errorpw,
            signinEmail:req.body.signinEmail,
            password:req.body.signinPassword
        });
    }
    else{
        res.redirect("/products");
    }
 });
 module.exports=router;
 