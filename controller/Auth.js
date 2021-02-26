const User = require('../models/User')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')




exports.registerUser = asyncHandler(async (req, res, next) => {
    console.log("REGISTER BODY", req.body)
    const { username, email, password,role } = req.body
    console.log("BEFORE", password)

    const user = await User.create({
        username,
        email,
        password,
        role
    })
    const token = user.getSignedJwtToken()

    res.status(200).json({
        sucess: true,
        token: token,
        data: user
    })



}//async

)//register

//LOGIN CONTROLLER
exports.loginUser = asyncHandler(async (req, res, next) => {
    console.log("LOGIN BODY", req.body)

    const { email, password } = req.body
    console.log("AFTER", password)

    if (!email || !password) {
        return next(new ErrorResponse('Please provide and email or password'), 400)
    }

    const user = await User.findOne({ email: email })
    console.log("USER 1", user)

    if (!user) {
        return next(new ErrorResponse('Invalid Crednetials'), 401)
    }
    const isMatch = await user.comparePassword(password)
    console.log("USER 2", isMatch)

    if (!isMatch) {
        return next(new ErrorResponse('Incorrect Password'), 401)
    }

    // const token = user.getSignedJwtToken()

    // res.status(200).json({
    //     sucess: true,
    //     token: token,
    //     data: user
    // })

    sendTokenResponse(user, 200, res)

})


//Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    console.log("WAS",token)
    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 3600 * 1000),
        httpOnly:true
    }

    if(process.env.NODE_ENV === 'production')
    {
        options.secure=true
    }

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            sucess: true,
            token,
            data:user
        })
}

//Get logged in user data
exports.getLoggedInUser= asyncHandler(async (req, res, next) => {


    console.log("GET LOGGED IN USER", req.user)

    const user= await User.findById(req.user._id)
   
    res.status(200).json({
        sucess: true,
        data: user
    })



})