const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt=require("bcryptjs");
//indicate the shape of the document that will be entering into the datbase
const userSchema = new Schema({
 
    signupName:
    {
        type:String,
        required:true
    },
    email:
    {
        type:String,
        required:true
    },
    password:
    {
        type:String,
        require:true,
    },
    passwordagain:
    {
        type:String,
        require:true,
    },
    dateCreated:
    {
        type:Date,
        default:Date.now()
    },
    type:
    {
        type:String,
        default:"User"
    }
});

userSchema.pre("save",function(next)
{
    //salt random generated characters or strings
    bcrypt.genSalt(10)
    .then((salt)=>{
        bcrypt.hash(this.password,salt)
        .then((encryptPassword)=>{
            this.password=encryptPassword;
            next();
        })
        .catch(err=>console.log(`Error occured when hashing ${err}`));
    })
    .catch(err=>console.log(`Error occured when salting ${err}`));

})
// For every schem you create(Create a schema per collection), you must also create a model
// The model will allow you to perform CRUD operations on a given collection
const usermodel = mongoose.model('User', userSchema);

//create a collection called User which have to follow the userSchema schema

//export the model
module.exports=usermodel;