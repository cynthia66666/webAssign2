const express = require('express')
const router = express.Router();
const usermodel=require("../model/users.js");
router.get("/",(req,res)=>{
    res.render("regissub",{
        title :"Register Submit"
    })
})
module.exports = router;