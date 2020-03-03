const express = require("express");
const exphbs = require('express-handlebars');
const model = require("./model/product");
const bodyParser = require('body-parser');
//load the environment variable file
require('dotenv').config({path:"./config/key.env"}) ;

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));


app.get("/",(req,res)=>{

    res.render("home",{
        title : "Home",
        data:model.getcate(),
        data1 : model.getbS()
        
    });
});

app.get("/products",(req,res)=>{

    res.render("products",{ //same name with the name of the handlebars
        title : "Product",
        data : model.getAllProduct()
       // data : model.product.getAllProduct()
    });
});

app.get("/cusRegistration",(req,res)=>{
    
    res.render("cusRegistration",{
        title : "Contact Us",
    });
});

app.get("/login",(req,res)=>{
   
    res.render("login",{
        title : "login",
        
    });
});
////process registration form for when user submits form
app.post("/cusRegistration",(req,res)=>{
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
        .then(()=>{
            res.redirect("/");
        })
        .catch(err=>{
            console.log(`Error ${err}`);
        })
    
    }
});


app.post("/login",(req,res)=>{
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
const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`Web Server Started`);
});