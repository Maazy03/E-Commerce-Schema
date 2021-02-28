 
const express = require('express')

const router = express.Router()
 
 //Protected Route intialization
const { protect } = require('../middleware/auth')


 //USER CONTROLLER
 const { registerUser,loginUser,getLoggedInUser,forgetPassword,
    resetPassword,updateUserDetails,updatePassword } = require('../controller/Auth')

 const app = express()


 router.route('/Signup').post(registerUser)
 router.route('/Login').post(loginUser)
 router.route('/LoggedIn').get(protect,getLoggedInUser)
 router.route('/forgetPassword').post(forgetPassword)
 router.route('/resetPassword/:resettoken').put(resetPassword)
 router.route('/updateDetails').put(protect,updateUserDetails)
 router.route('/updatePassword').put(protect,updatePassword)
 // router.route('/User/:id').get(getUser)

 module.exports=router