const User = require('../models/User')
const Orders = require('../models/Orders')
// const Products = require('../models/Products')
const crypto = require('crypto')
const bcrypt = require("bcryptjs")
const sendEmail = require('../utils/sendEmail')
const jwt = require('jsonwebtoken')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')




exports.registerUser = asyncHandler(async (req, res, next) => {
    console.log("REGISTER BODY", req.body)
    const { username, email, password, role } = req.body
    // console.log("BEFORE", password)

    const user = await User.create({
        username,
        email,
        password,
        role,

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

//Forget Password
exports.forgetPassword = asyncHandler(async (req, res, next) => {


    console.log("GET LOGGED IN USER", req.body.email)

    const user = await User.findOne({ email: req.body.email })

    console.log("F USEr", user)
    if (!user) {
        return (next(new ErrorResponse('This is not a valid email', 404)))
    }

    //Calling Reset method from USer model
    const resetToken = user.getResetPasswordToken()
    await user.save({ validateBeforeSave: false })
    console.log("RESET TOKEN", resetToken)

    const resetUrl = `${req.protocol}://${req.get('host')}/ecomm/auth/resetpassword/${resetToken}`
    console.log("HOLLY", resetUrl)
    const message = `You are received rest password email ${resetUrl}`
    try {
        console.log("yes1")
        await sendEmail({
            email: user.email,
            subject: 'password reset token',
            message
        })
        res.status(200).json({ sucess: true, data: 'Email sent' })
    }
    catch (error) {
        console.log("no1", error)
        user.resetPasswordToken = undefined
        user.resetPassworExpire = undefined
        await user.save({ validateBeforeSave: false })
        next(new ErrorResponse('email culdn ot ben sent', 500))
    }

})

//Reset Password API
exports.resetPassword = asyncHandler(async (req, res, next) => {

    console.log("RESET PASSWORD", req.params)
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.resettoken).digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })
    console.log("TOKEN USER", user)
    if (!user) {
        return next(new ErrorResponse('Ínvalid token', 400))
    }

    //Set New Password
    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    await user.save()
    console.log("WWWWWWWw")
    sendTokenResponse(user, 200, res)



})


//Update user details
exports.updateUserDetails = asyncHandler(async (req, res, next) => {
    console.log("mmmmmm", req.user)
    const fieldToupdate = {
        username: req.body.username,
        email: req.body.email
    }
    console.log("Update user", req.body)

    const user = await User.findByIdAndUpdate(req.user._id, fieldToupdate, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        sucess: true,
        data: user
    })




})


//Update User Password
exports.updatePassword = asyncHandler(async (req, res, next) => {


    console.log("GET LOGGED IN USER", req.user)

    const user = await User.findById(req.user._id)

    if (!await user.comparePassword(req.body.currentPassword)) {
        return next(new ErrorResponse('Password in  incorrect', 401))
    }

    user.password = req.body.newPassword
    await user.save()

    // res.status(200).json({
    //     sucess: true,
    //     data: user
    // })

    sendTokenResponse(user, 200, res)


})



//Get logged in user data
exports.getLoggedInUser = asyncHandler(async (req, res, next) => {


    console.log("GET LOGGED IN USER", req.user)

    const user = await User.findById(req.user._id).poupulate('products')

    res.status(200).json({
        sucess: true,
        data: user
    })



})



//Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    console.log("WAS", token)
    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 3600 * 1000),
        httpOnly: true
    }

    if (process.env.NODE_ENV === 'production') {
        options.secure = true
    }

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            sucess: true,
            token,
            data: user
        })
}


//ADMIN OPERATIONS
//GET ALL AUTHS INCLUDING USERS AND VENDORS


exports.getallUsers = asyncHandler(async (req, res, next) => {

    console.log("req all users", req.user.role)
    const allBootCamps = await User.find().populate('products')

    res.status(200).json({
        sucess: true,
        data: allBootCamps
    })

})


//DELETING AUTH


exports.deleteSingleProduct = asyncHandler(async (req, res, next) => {


    console.log("dsdsdssdsdasdasdasdasdas", req.params.id)
    console.log("dsdsdssdsdasdasdasdasdas 3", req.user)
    let deleteUser = await User.findById(req.params.id)
    console.log("dsdsdssdsdasdasdasdasdas 22222", deleteUser)

    console.log("USER DEL", deleteUser._id, req.params.id)


    if (!deleteUser) {
        return next(new ErrorResponse(`${req.params.id} is not valid`, 400))
    }

    if (deleteUser._id.toString() !== req.params.id) {
        return next(new ErrorResponse(`${req.user.id} not found`, 401))
    }
    if(deleteUser._id.toString() === req.params.id)
    { 
        let orderstoDel =await Orders.findOneAndDelete({user:req.params.id})
        console.log("ORDERS TBD",orderstoDel)

    }
    deleteUser = await User.findByIdAndDelete(req.params.id)
    deleteUser.remove()

    res.status(200).json({
        sucess: true,
        message: `${req.params.id} is succesfully deleted`,

    })



})