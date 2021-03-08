const Orders = require('../models/Orders')
const Buyer = require('../models/Buyer')
const Products = require('../models/Products')
const jwt = require('jsonwebtoken')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const User = require('../models/User')


//@desc post single bootcamps
//route /get/api/v1/bootcamps

exports.placeOrder = async (req, res, next) => {
    try {

        // console.log("CREATE ORDER 011", req.body.user)
        console.log("CREATE ORDER 011", req.body)
        console.log("CREATE ORDER 011AA", req.user)

        let buyer = await Buyer.findOne({ _id: req.user._id })
        console.log("BUYER O 1", buyer)
        req.body.buyer = buyer._id;
        req.body.product = buyer._id
        console.log("nuyer._id", buyer)
        console.log("req.body.user", req.body)
        
        const createOrders = new Orders(req.body)
        const savedOrder = await createOrders.save()
        console.log('populated -->', savedOrder)
        
         let productID
 
         req.body.orderItems.map(async prod => {
 
             console.log("PROD", prod.product)
             productID = await Products.findById(prod.product).populate('user')
             console.log("POPULATED ---",productID)
             console.log("USER ID ---",productID.user._id)
             let userID = await User.findById(productID.user._id)
             console.log("USER ---",userID)
             userID.orders.push(savedOrder._id)
             await userID.save()
             console.log("AFTER USER ID",userID)

         })
        // let chec = await Orders.populate(savedOrder, 'buyer')
        buyer.orders.push(savedOrder._id)
        // let id ="6043869e729064165c8c145d"
        // const createOrder = await (await Orders.create(req.body)).populate('user')
        return savedOrder

    }
    catch (err) {
        throw err
    }


}

exports.getOrdersofSingleUser = async (req, res, next) => {

    try {
        console.log("GOFSU", req.user)
        let buyer = await Buyer.findById(req.user._id).select('name email')
            .populate({
                path:'orders',
                select:'-_id orderItems shippingAddress',
                populate:{
                    path:'product',
                    model:'Products'
                }})
            // .populate('products')
            // .populate('products')




        console.log("emnm", buyer)
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
        // res.status(201).json({
        //     sucess: true,
        //     data: user
        // })

        return buyer
        // console.log("BOOT CAMP SUCESS")

    }
    catch (err) {
        throw err
    }

}







