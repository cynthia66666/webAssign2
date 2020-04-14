const express = require('express')
const router = express.Router();
const usermodel=require("../model/users.js");
router.get("/",(req,res)=>{
    res.render("regissub",{
        title :"Register Submit",
    });
})


router.get("/logout",(req,res)=>{
    req.session.destory();//kill the session
    res.redirect("/login")//redirect users to login page
})
module.exports = router;