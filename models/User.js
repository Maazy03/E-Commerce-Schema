const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')
const jwt =require("jsonwebtoken")
// const Schema = mongoose.Schema;
// var uniqueValidator = require('mongoose-unique-validator');


const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    required: [true, "Please add an username"],
    match: [/^[a-zA-Z0-9]+$/, 'Username is invalid'],
    index: true
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "Please add an email"],
    match: [/\S+@\S+\.\S+/, 'Email is invalid'],
    index: true
  },
  password: {
    type: String,
    required:[true,'Please add a password'],
    minlength:[6,'Password length is small']
  },
  resetPasswordToken:String,
  resetPasswordExpire:Date,
  createdAt:{
    type:Date,
    default:Date.now
  },
  role:{
    type:String,
    enum:['user','vendor'],
    // default:'user'

  }

}) 

//Encrypt password using bcrypt
UserSchema.pre('save',async function(next){
  const salt=await bcrypt.genSalt(10)
  this.password=await bcrypt.hash(this.password,salt)
})

//Sign JWT and return
UserSchema.methods.getSignedJwtToken=function(){
  return jwt.sign({id:this._id},process.env.JWT_SECRET,{
    expiresIn:process.env.JWT_EXPIRE
  })
}
//Comparing hashed paswd
UserSchema.methods.comparePassword=async function(enteredPassword)
{
  return await bcrypt.compare(enteredPassword,this.password)
}

 



module.exports = mongoose.model('User', UserSchema)