const User = require('../models/User')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')




exports.registerUser = asyncHandler(async (req, res, next) => {
    console.log("REGISTER BODY", req.body)
    const { username, email, password } = req.body
    console.log("BEFORE", password)

    const user = await User.create({
        username,
        email,
        password
    })
    const token = user.getSignedJwtToken()

    res.status(200).json({
        sucess: true,
        token: token,
        data: user
    })



    // bcrypt.hash(req.body.password, 10, function (error, hashedPass) {
    //     if (error) {
    //         res.json({
    //             error: err
    //         })
    //     }

    //     let user = new User({
    //         username: req.body.username,
    //         email: req.body.email,
    //         password: hashedPass

    //     })


    //     // user.save()
    //     //     .then(user => {
    //     //         console.log("SUCESS", user)
    //     //         res.status(201).json({
    //     //             data: user,
    //     //             message: "USER ADDED SUCCESSFULLY"
    //     //         })
    //     //     })
    //     //     .catch(err => {
    //     //         console.log("ERR", err)
    //     //         next(err)

    //     //         // res.json({
    //     //         //     message: "USER NOT ADDED"
    //     //         // })
    //     //     })
    // }


    // )



}//async

)//register


exports.loginUser = asyncHandler(async (req, res, next) => {
    console.log("LOGIN BODY", req.body)

    const { email, password } = req.body
    console.log("AFTER", password)

    if (!email || !password) {
        return next(new ErrorResponse('Please provide and email or password'), 400)
    }

    const user = await User.findOne({ email:email })
    console.log("USER 1", user)

    if (!user) {
        return next(new ErrorResponse('Invalid Crednetials'), 401)
    }
    const isMatch = await user.comparePassword(password)
    console.log("USER 2", isMatch)

    if (!isMatch) {
        return next(new ErrorResponse('Incorrect Password'), 401)
    }

    const token = user.getSignedJwtToken()

    res.status(200).json({
        sucess: true,
        token: token,
        data: user
    })


    // User.findOne({ $or: [{ email: email }, { phone: email }] })
    //     .then(user => {
    //         if (user) {
    //             bcrypt.compare(password, user.password, function (err, result) {
    //                 if (err) {
    //                     console.log("SHIKWA ERR", err)
    //                     res.json({
    //                         error: err
    //                     })
    //                     console.log("EREN 22", err)
    //                     res.json({
    //                         message: "password not matched"
    //                     })


    //                 }//if err
    //                 if (result) {
    //                     console.log("SUCESS TEUW", result)
    //                     let token = jwt.sign({ email: user.email }, 'verySecretValue', { expiresIn: '48h' })
    //                     res.status(201).json({
    //                         token: token,
    //                         message: "LOGGED IN SUCCESSFULLY"
    //                     })
    //                 }
    //                 else {
    //                     console.log("EREN fgvb", err)
    //                     res.status(404).json({
    //                         message: "password not matched"
    //                     })

    //                     // next(err)
    //                 }
    //             })

    //             return user
    //         }
    //     })

    //     .catch(err => {
    //         console.log("errrr", err)

    //     })

})