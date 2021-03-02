const Orders = require('../models/Orders')
const jwt = require('jsonwebtoken')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const User = require('../models/User')


//@desc post single bootcamps
//route /get/api/v1/bootcamps

exports.placeOrder = asyncHandler(async (req, res, next) => {


    console.log("CREATE ORDER 011", req.body.user)


    let user = await User.findOne({ _id: req.user.id })
    req.body.user = user._id;
    console.log("user._id", user)
    console.log("req.body.user", req.body.user)
    const createOrders = new Orders(req.body)
    const savedOrder = await createOrders.save()
    let chec = await Orders.populate(savedOrder, 'user')
    user.orders.push(savedOrder._id)
    await user.save()
    console.log('populated -->', savedOrder)


    // const createOrder = await (await Orders.create(req.body)).populate('user')
    res.status(201).json({
        sucess: true,
        data: savedOrder
    })
    console.log("BOOT CAMP SUCESS")



})

exports.getOrdersofSingleUser = asyncHandler(async (req, res, next) => {


console.log("GOFSU",req.user)
    let user = await User.findById(req.user._id).select('-products').populate('orders')

    console.log("emnm",user)
    
    // req.body.user = user._id;
    // console.log("user._id", user)
    // console.log("req.body.user", req.body.user)
    // const createOrders = new Orders(req.body)
    // const savedOrder = await createOrders.save()
    // let chec = await Orders.populate(savedOrder, 'user')
    // user.products.push(savedOrder._id)
    // await user.save()
    // console.log('populated -->', savedOrder)


    // const createOrder = await (await Orders.create(req.body)).populate('user')
    res.status(201).json({
        sucess: true,
        data: user
    })
    console.log("BOOT CAMP SUCESS")



})







