
const express = require('express')

const router = express.Router()


//Protected Route intialization
const { protect2, authorize } = require('../middleware/auth')

//ORDERS CONTROLLER
const { placeOrder, getOrdersofSingleUser } = require('../controller/Orders')


// const bootcamps= require('./routes/devcamp')

const app = express()

//Mount routers
// app.use('./api/v1/bootcamps',bootcamps)


//PRODUCT APIS


router.post('/placeOrder', protect2,authorize('buyer'),function (req, res) {
console.log("ARHA",req.user)
    placeOrder(req).then((response) => {
        res.status(201).json({
            responseCode: 200,
            responseMessage: "Order Placed Carefully",
            result: response
        })
    })
        .catch((error) => {
            let message
            if (error.name === "ValidationError") {
                console.log("object")
                console.log("No", Object.values(error.errors))
                message = Object.values(error.errors).map(val => val.message)
            }
            console.log("NA", error)
            res.status(error.status).json({
                responseCode: error.status,
                responseMessage: message,
                result: {}
            })
        })



})


router.get('/Order',protect2,authorize('buyer'),function(req,res){
    getOrdersofSingleUser(req).then((response) => {
        res.status(200).json({
            responseCode: 200,
            responseMessage: "Ordersss",
            result: response
        })
    })
        .catch((error) => {
            console.log("NA", error)
            res.status(404).json({
                responseCode: error.status,
                responseMessage: error,
                result: {}
            })
        })
})
// router.route('/Order').get(protect, authorize('purchaser'), getOrdersofSingleUser)
// router.route('/Products').get(getProducts)
// router.route('/Product/:id').get(protect,getSingleProduct).delete(protect,deleteSingleProduct).put(protect,updateProduct)
// router.route('/vendorProducts').get(protect,getSingleVendorProducts)
// router.route('/createOrder').post(protect, authorize('purchaser'), placeOrder)


module.exports = router