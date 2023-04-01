const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email : {
        type:String,
        required: true,
        unique: true
    },
    password :{
        type:String,
        required: true
    },
    confirmpassword :{
        type:String,
        required: true
    },
    name : {
        type:String,
        required: true
    },
    phonenumber : {
        type:Number,
        required: true,
        unique: true
    }

})


const Register = new mongoose.model("Register", userSchema);

module.exports = Register;