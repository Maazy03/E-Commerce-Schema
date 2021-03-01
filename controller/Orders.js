const Orders = require('../models/Orders')
const jwt = require('jsonwebtoken')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const User=require('../models/User')





//@desc post single bootcamps
//route /get/api/v1/bootcamps

exports.placeOrder = asyncHandler(async (req, res, next) => {

 
    console.log("CREATE ORDER 011", req.body.user)
   

        const user = await User.findOne({ _id: req.user.id })
        req.body.user = user._id;
        console.log("user._id",user)
        console.log("req.body.user",  req.body.user)
      
        const createOrders = new Orders(req.body)   
        const savedOrder = await createOrders.save();

        let chec= await Orders.populate(savedOrder, 'user')
   
        console.log('populated -->',savedOrder)
    
    
    // const createOrder = await (await Orders.create(req.body)).populate('user')
    res.status(201).json({
        sucess: true,
        data: savedOrder
    })
    console.log("BOOT CAMP SUCESS")



})



//Get logged in user data
exports.getLoggedInUser = asyncHandler(async (req, res, next) => {


    console.log("GET LOGGED IN USER", req.user)

    const user = await User.findById(req.user._id)

    res.status(200).json({
        sucess: true,
        data: user
    })



})

