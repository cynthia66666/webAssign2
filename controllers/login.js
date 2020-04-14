const express=require('express');
const router=express.Router();
const usermodel=require("../model/users.js");
const bcrypt=require("bcryptjs");

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
        usermodel.findOne({email:req.body.signinEmail})
        .then(user=>{

            const errors=[];
            //email not found
            if(user==null)
            {
                errors.push("Sorry, your email and/or password encorrect");
                res.render("login",{//handlebars
                    errors
                })
            }
            //email is found
            else
            {
                bcrypt.compare(req.body.signinPassword,user.signinPassword)
                    .then(isMatched=>{
                        if(isMatched)
                        {
                            //create the session
                            req.session.userInfo=user;
                            res.redirect("/regissub");
                        }
                        else
                        {
                            errors.push("Sorry, your email and/or password encorrect");
                            res.render("login",{//handlebars
                                errors
                            })
                        }

                    })
                    .catch(err=>console.log(`Error ${err}`));
                
            }

        })
        .catch(err=>console.log(`Error${err}`));

    }
 });
 module.exports=router;
 