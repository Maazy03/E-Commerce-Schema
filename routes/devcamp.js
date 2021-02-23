
const express = require('express')

const router = express.Router()
const {getBootcamps,getBootcamp,createBootcamp,updateBootcamp,deleteBootcamp}=require('../controller/devcamp')
// const bootcamps= require('./routes/devcamp')

const app = express()

//Mount routers

// app.use('./api/v1/bootcamps',bootcamps)

router.route('/').get(getBootcamps).post(createBootcamp)
router.route('/:id').get(getBootcamp).delete(deleteBootcamp).put(updateBootcamp)


module.exports=router