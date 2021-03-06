const crypto = require('crypto')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
// const Schema = mongoose.Schema;
// var uniqueValidator = require('mongoose-unique-validator');


const BuyerSchema = new mongoose.Schema({
    name: {
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
        required: [true, 'Please add a password'],
        minlength: [6, 'Password length is small']
    },

    role: {
        type: String,
        enum: ['vendor', 'buyer'],
        default: 'buyer'

    },
    //   products: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Products'

    //   }],
    //   orders: [
    //     {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: 'Orders'

    //     }
    //   ]


})

//Encrypt password using bcrypt
BuyerSchema.pre('save', async function (next) {

    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)


})

//Sign JWT and return
BuyerSchema.methods.getSignedJwtToken = function () {
    console.log("CACSAS")
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}
//Comparing hashed paswd
BuyerSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

//Generate and hash password token
BuyerSchema.methods.getResetPasswordToken = function () {

    //Generate Token
    const resetToken = crypto.randomBytes(20).toString('hex')

    //Hash TOken and set to resetPassword Token field
    this.resetPasswordToken = crypto.createHash('SHA256').update(resetToken).digest('hex')

    //Set Expire
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000
    return resetToken

}



module.exports = mongoose.model('Buyer', BuyerSchema)