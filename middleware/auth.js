const jwt = require('jsonwebtoken')
const asyncHandler = require('./async')
const ErrorResponse = require('../utils/errorResponse')
const User=require('../models/User')

exports.protect = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }
    // else if(req.cookies.token){
    //     token=req.cookies.token
    // }

    //Make sure token exists
    if (!token) {
        next(new ErrorResponse('Token not present',401))
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // console.log("DECODED",decoded,req)
        req.user=await User.findById(decoded.id)
        next()


    } catch (error) {
        console.log("df")
        next(new ErrorResponse('Not authorized to access this route',401))
    }
})

exports.authorize=(...roles)=>{
    console.log("ROLES",...roles)
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorResponse(` ${req.user.role} is unauthroized to do this action`,403))
        }
        next();
    }
}