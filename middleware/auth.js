const jwt = require('jsonwebtoken')
const asyncHandler = require('./async')
const ErrorResponse = require('../utils/errorResponse')
const User = require('../models/User')
const Buyer = require('../models/Buyer')

exports.protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }

    console.log("TPEN", token)

    //Make sure token exists
    if (!token) {
        console.log("TOKEN 01", token)
        next(new ErrorResponse('Token not present', 401))
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log("DECODED", decoded)
        let user = await User.findById(decoded.id)
        console.log('user====', user)
        if (user) {

            req.user = user
        }
        next()


    } catch (error) {
        console.log("TOKEN", error)
        next(new ErrorResponse('Not authorized to access this route', 401))
    }
})

exports.protect2 = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }

    console.log("TPEN", token)

    //Make sure token exists
    if (!token) {
        console.log("TOKEN 01", token)
        next(new ErrorResponse('Token not present', 401))
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log("DECODED", decoded)
        let user = await Buyer.findById(decoded.id)
        console.log('user====', user)
        if (user) {

            req.user = user
        }
        else {
            throw e
        }
        next()


    } catch (error) {
        console.log("TOKEN", error)
        next(new ErrorResponse('Not authorized to access this route', 401))
    }
})

exports.authorize = (...role) => {
    console.log("ROLES", ...role)
    return (req, res, next) => {
        console.log("ROLES 2", req.user.role)
        if (!role.includes(req.user.role)) {
            return next(new ErrorResponse(` ${req.user.role} is unauthroized to do this action`, 403))
        }
        next();
    }
}