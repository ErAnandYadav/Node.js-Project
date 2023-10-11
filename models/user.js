const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    fname:{
      type:String,
      required:true
    },
    lname:{
      type:String,
      required:true
    },
    email:{
      type:String,
      unique: true,
      required:true,
      match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
    },
    isActive: {
      type: Boolean,
      default: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    verificationToken: {
      type: String
    },
    forgotPasswordToken: {
      type: String
    },
    forgotPasswordExpires: {
      type: String
    },
    password:{
      type:String,
      required:true
    }
})

const User = new mongoose.model("User", userSchema)

module.exports = User