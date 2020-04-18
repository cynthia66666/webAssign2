const express = require("express");
const exphbs = require('express-handlebars');
// const model = require("./model/product");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
//load the environment variable file
require('dotenv').config({path:"./config/keys.env"}) ;
const fileUpload = require('express-fileupload');

const app = express();

app.engine('handlebars', exphbs({
    helpers:{
        if_eq:function(c1,c2,options)
        {
            if(c1==c2){
                return options.fn(this);
            }  
            else{
                return options.inverse(this);
            }
        },
        if_higher: function(c1,c2,options){
            if(c1>c2){
                return optioons.fn(this);
            }
            else{
                return options.inverse(this);
            }
            
        }
    }
}
));
app.set('view engine', 'handlebars');

/*This is to allow specfic forms and/or links that were 
submitted/pressed to sent PUT and DELETE request respctively*/
app.use((req,res,next)=>{

    if(req.query.method=="PUT")
    {
        req.method="PUT"
    }

    else if(req.query.method=="DELETE")
    {
        req.method="DELETE"
    }

    next();
});
app.use(fileUpload());

app.use(session({
    secret: `${process.env.SECRET_KEY}`,
    resave: false,
    saveUninitialized: true
  }));
 //every handler bar can enter the session as the global template variable
app.use((req,res,next)=>{
    res.locals.user=req.session.userInfo;
    next();
});
//load controllers
const generalController=require("./controllers/general");
const productController=require("./controllers/product");
const userController=require("./controllers/user");


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
//map each controller to the app object
app.use("/", generalController);
app.use("/user",userController);
app.use("/product",productController);



mongoose.connect(process.env.MANGO_DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log(`Connected to MongoDB Database`);
})
.catch(err=>console.log(`ERROR occured when connecting to the database ${err}`))

const PORT=process.env.PORT;
//Creates an express web server that listens for incoming HTTP requests
app.listen(PORT,()=>{
    console.log(`Web Server Started`);
});

