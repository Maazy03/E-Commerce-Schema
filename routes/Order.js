
const express = require('express')

const router = express.Router()


//Protected Route intialization
const { protect,authorize } = require('../middleware/auth')

//ORDERS CONTROLLER
const { placeOrder,getOrdersofSingleUser } =require('../controller/Orders')


// const bootcamps= require('./routes/devcamp')

const app = express()

//Mount routers
// app.use('./api/v1/bootcamps',bootcamps)


//PRODUCT APIS
router.route('/createOrder').post(protect,authorize('user'),placeOrder)
router.route('/Order').get(protect,authorize('user'),getOrdersofSingleUser)
// router.route('/Products').get(getProducts)
// router.route('/Product/:id').get(protect,getSingleProduct).delete(protect,deleteSingleProduct).put(protect,updateProduct)
// router.route('/vendorProducts').get(protect,getSingleVendorProducts)


module.exports = router