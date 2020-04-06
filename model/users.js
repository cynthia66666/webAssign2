const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//indicate the shape of the document that will be entering into the datbase
const userSchema = new Schema({
 
    signupName:
    {
        type:String,
        required:true
    },
    signupEmail:
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
    }

});
// For every schem you create(Create a schema per collection), you must also create a model
// The model will allow you to perform CRUD operations on a given collection
const usermodel = mongoose.model('User', userSchema);

//create a collection called User which have to follow the userSchema schema

//export the model
module.exports=usermodel;