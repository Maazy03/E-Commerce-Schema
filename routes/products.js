
const express = require('express')

const router = express.Router()
const {getProducts,createProduct,getSingleProduct,deleteSingleProduct,updateProduct}=require('../controller/Products')
// const bootcamps= require('./routes/devcamp')

const app = express()

//Mount routers

// app.use('./api/v1/bootcamps',bootcamps)

//PRODUCT APIS
router.route('/Products').get(getProducts)
router.route('/AddProduct').post(createProduct)
router.route('/Product/:id').get(getSingleProduct).delete(deleteSingleProduct).put(updateProduct)


module.exports=router