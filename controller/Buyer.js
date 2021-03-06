const Buyer = require('../models/Buyer')
const Orders = require('../models/Orders')
const crypto = require('crypto')
const bcrypt = require("bcryptjs")
const sendEmail = require('../utils/sendEmail')
const jwt = require('jsonwebtoken')


exports.registerBuyer = async (req, res, next) => {
    try {
        console.log("REGISTER BODY BUYER", req.body)
        const { name, email, password, role } = req.body
        // console.log("BEFORE", password)

        const buyer = await Buyer.create({
            name,
            email,
            password,
            role
        })
        console.log("object", buyer)
        const token = buyer.getSignedJwtToken()
        console.log("LOL", token)
        const registerBuyer = {
            token: token,
            data: buyer
        }
        return registerBuyer
    }
    catch (e) {
        throw e
    }


}//register


//LOGIN CONTROLLER
exports.loginBuyer = async (req, res, next) => {
    try {

        console.log("LOGIN BODY", req.body)
        const { email, password } = req.body
        console.log("AFTER", password)

        if (!email || !password) {
            throw "please provide an email or password"
            // return next(new ErrorResponse('Please provide and email or password'), 400)
        }

        const purchaser = await Buyer.findOne({ email: email })
        console.log("USER 1", purchaser)

        if (!purchaser) {
            throw "Invalid Credentials"
            // return next(new ErrorResponse('Invalid Crednetials'), 401)
        }
        const isMatch = await purchaser.comparePassword(password)
        console.log("USER 2", isMatch)

        if (!isMatch) {
            throw "Incorrect Password"

            // return next(new ErrorResponse('Incorrect Password'), 401)
        }



        const loginResponseBuyer = sendTokenResponse(purchaser, 200, res)
        console.log("asddasasdasdsadasdasdasd", loginResponseBuyer)
        return loginResponseBuyer
    }
    catch (e) {
        throw e
    }

}


const sendTokenResponse = (purchaser, statusCode, res) => {
    const token = purchaser.getSignedJwtToken();
    console.log("WAS", token)
    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 3600 * 1000),
        httpOnly: true
    }

    if (process.env.NODE_ENV === 'production') {
        options.secure = true
    }

    // res.cookie('token', token, options)

    const newObj = {
        token,
        data: purchaser
    }
    return newObj

    // returm

    //     res
    //         .status(statusCode)
    //         .cookie('token', token, options)
    //         .json({
    //             sucess: true,
    //             token,
    //             data: purchaser
    //         })
}
