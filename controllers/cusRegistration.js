const express=require('express')
const router=express.Router();
const usermodel=require("../model/users.js");
router.get("/",(req,res)=>{
    
    res.render("cusRegistration",{
        title : "Contact Us",
    });
});

router.post("/",(req,res)=>{
    /* rules for inserting into MonDB databse USING MONGOOSE is to do the following:
    1. You have to create an instance of te model, you must pass data that you wanna 
    insert in the form of an object(object literal)
    2. From the instance, you can the save mothod
    */
  



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
    if(req.body.signupEmail=="")
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
        res.render("cusRegistration",{
            title:"Register Page",

            signupName:req.body.signupName,
            signupEmail:req.body.signupEmail,
            password:req.body.password,
            passwordagain:req.body.passwordagain,

            nerror:errorNM,
            eerror:errorEM,
            perror:errorPM,
            paerror:errorPM2
        });
    }
    else{

        const {signupName,signupEmail}=req.body;
        const sgMail = require('@sendgrid/mail');
        //to pass the env variable name
        sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
        const msg = {
        from: 'cynthiahuanglulu@gmail.com',
        to: `${signupEmail}`,
        subject: 'Welcome to join us!',
        html: 
        ` Hello ${signupName} <br>
            Welcome to join us! <br>
            With your new account, you can purchase everything you need to. 
        `,
        };

        sgMail.send(msg)
        const newUser={
            signupName:req.body.signupName,//naming has to be same as the names in users.js
            signupEmail:req.body.signupEmail,
            password:req.body.password,
            passwordagain:req.body.passwordagain
       }
       const user= new usermodel(newUser);//create a new instance of usermodel and pass structure to it
       user.save() //return a promist
       .then(()=>
       {
            res.redirect("/regissub");
    
       })
       .catch(err=>console.log(`Error happened when inserting in the database :${err}`));
    


        /*.then(()=>{
            res.redirect("/regissub");
        })
        .catch(err=>{
            console.log(`Error ${err}`);
        })*/
    
    }
});


module.exports=router;