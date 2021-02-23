
const express = require('express')

const router = express.Router()
const {getProducts,createProduct}=require('../controller/devcamp')
// const bootcamps= require('./routes/devcamp')

const app = express()

//Mount routers

// app.use('./api/v1/bootcamps',bootcamps)

router.route('/').get(getProducts).post(createProduct)
// router.route('/:id').get(getBootcamp).delete(deleteBootcamp).put(updateBootcamp)


module.exports=router