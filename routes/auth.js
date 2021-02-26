 
const express = require('express')

const router = express.Router()
 
 
 //USER CONTROLLER
 const { registerUser,loginUser } = require('../controller/Auth')

 const app = express()


 router.route('/Signup').post(registerUser)
 router.route('/Login').post(loginUser)
 // router.route('/User/:id').get(getUser)

 module.exports=router