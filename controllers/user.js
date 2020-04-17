const express=require('express')
const router=express.Router();
const usermodel=require("../model/users.js");
const isAuthenticated=require("../middleware/auth.js");
const bcrypt=require("bcryptjs");
const dashboardLoader=require("../middleware/authorization");
router.get("/login",(req,res)=>{
   
    res.render("User/login",{
        title : "login"
    });
});

 
router.post("/login",(req,res)=>{
    const errornm=[];
    const errorpw=[];
    if(req.body.email=="")
    {
        errornm.push("Please enter your email");
    }
    if(req.body.password=="")
    {
        errorpw.push("Please enter your password");
    }
    if(errornm.length>0||errorpw.length>0)
    {
        res.render("User/login",{
            title: "Login Page",
            nmerror:errornm,
            pwerror:errorpw,
            email:req.body.email,
            password:req.body.password
        });
    }
    else{
        usermodel.findOne({email:req.body.email})
        .then(user=>{
            const errors=[];
            //email not found
            if(user==null)
            {
                errors.push("Sorry, your email and/or password incorrect");
                res.render("User/login",{//handlebars
                    errors
                })
            }
            //email is found
            else
            {
                bcrypt.compare(req.body.password,user.password)
                    .then(isMatched=>{
                        if(isMatched)
                        {
                            //create the session
                            req.session.userInfo=user;
                            res.redirect("loginsub");
                            //dashboardLoader(req,res);
                        }
                        else
                        {
                            errors.push("Sorry, your  email and/or password incorrect");
                            res.render("User/login",{//handlebars
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

router.get("/cusRegistration",(req,res)=>{
    
    res.render("User/cusRegistration",{
        title : "Contact Us",
    });
});

router.post("/cusRegistration",(req,res)=>{
    
    const errorNM=[];
    const errorEM=[];
    const errorPM=[];
    const errorPM2=[];
    //check null
    if(req.body.signupName=="")
    {
        errorNM.push("Please enter your name");
    }
    //check null
    if(req.body.email=="")
    {
        errorEM.push("Please enter your email");
    }
    //advance validation on number checking
    let passvalid=req.body.password;
    const regexp= RegExp(/^[A-Za-z1-9]+$/);
    if(req.body.password.length>5&&req.body.password.length<13)
    {
        if(!regexp.test(passvalid))
        {
            errorPM.push("Please only enter letters and numbers");
        }
    }
    else
    {
        errorPM.push("Password length must between 6 to 12.")
    }
    //reenter password
    if(req.body.passwordagain=="")
    {
        errorPM2.push("Please enter the password again");
    }
    if(req.body.passwordagain!= passvalid)
    {
        errorPM2.push("Please enter the same password");
    }
    if(errorNM>0||errorEM>0||errorPM.length>0||errorPM2.length>0)
    {
        res.render("User/cusRegistration",{
            title:"Register Page",

            signupName:req.body.signupName,
            email:req.body.email,
            password:req.body.password,
            passwordagain:req.body.passwordagain,

            nerror:errorNM,
            eerror:errorEM,
            perror:errorPM,
            paerror:errorPM2
        });
    }
    else{

        const {signupName,email}=req.body;
        const sgMail = require('@sendgrid/mail');
        //to pass the env variable name
        sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
        const msg = {
        from: 'cynthiahuanglulu@gmail.com',
        to: `${email}`,
        subject: 'Welcome to join us!',
        html: 
        ` Hello ${signupName} <br>
            Welcome to join us! <br>
            With your new account, you can purchase everything you need to. 
        `,
        };

        sgMail.send(msg)
        /* rules for inserting into MonDB databse USING MONGOOSE is to do the following:
        1. You have to create an instance of te model, you must pass data that you wanna 
        insert in the form of an object(object literal)
        2. From the instance, you can the save mothod
        */
        const newUser={
            signupName:req.body.signupName,//naming has to be same as the names in users.js
            email:req.body.email,
            password:req.body.password,
            passwordagain:req.body.passwordagain
       }
       const user= new usermodel(newUser);//create a new instance of usermodel and pass structure to it
       user.save() //return a promist
       .then(()=>
       {
            res.redirect("regissub");
       })
       .catch(err=>console.log(`Error happened when inserting in the database :${err}`));
    }
});


router.get("/regissub",(req,res)=>{
   
    res.render("User/regissub",{
        title :"Register Submit",
    });
});
/*
router.get("/loginsub",isAuthenticated,(req,res)=>{
    res.render("User/loginsub",{
        title:"Customer Login Submit",
    });
});
*/
router.get("/loginsub",isAuthenticated,dashboardLoader);

router.get("/logout",(req,res)=>{
    req.session.destroy();//kill the session
    res.redirect("/user/login")//redirect users to login page
});
router.get("/admin-profile",isAuthenticated,(req,res)=>{
    res.render("User/adminDashboard",{
        title:"Admin Profile",
    });
});



module.exports=router;