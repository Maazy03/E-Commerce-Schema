
const express = require('express')

const router = express.Router()

//Protected Route intialization
const { protect, authorize } = require('../middleware/auth')


//USER CONTROLLER
const { registerUser, loginUser, getLoggedInUser, forgetPassword,
   resetPassword, updateUserDetails, updatePassword, getallUsers, deleteSingleProduct,getOrders } = require('../controller/Auth')

const app = express()


// router.route('/Signup').post(registerUser)
router.post('/Signup', function (req, res) {
   registerUser(req).then((response) => {
      //SUCCESS
      // console.log("RSEEEE", response)
      res.status(200).send(
         {
            responseCode: 200,
            responseMessage: "success",
            result: response
         }
      )
   }).catch((err) => {

      //Duplicate Key Error
      let message
      if (err.name === "MongoError" && err.code === 11000) {
         console.log("ELSEE", Object.keys(err.keyValue))
         // const message=`${err.keyValue} already exists`
         message = Object.keys(err.keyValue)[0] + " already exists"
      }


      res.status(400).send(
         {
            responseCode: 400,
            responseMessage: message,
            result: {}
         }
      )
   });
});

router.post('/Login', function (req, res) {
   loginUser(req).then((response) => {
      // console.log("LOGIN TRY", response)

      res.status(200).send(
         {
            responseCode: 200,
            responseMessage: "success",
            result: response
         }
      )


   }).catch((err) => {
      // console.log("LOGIN CATCH", err)
      res.status(400).send(
         {
            responseCode: 400,
            responseMessage: err,
            result: {}
         }
      )

   })
})


router.post('/forgetPassword', function (req, res) {

   forgetPassword(req).then((response) => {

      // console.log("forget password try", response)
      res.status(200).send(
         {
            responseCode: 200,
            responseMessage: "success",
            result: response.data
         }
      )
   })
      .catch((e) => {
         // console.log("forget password catch", e)
         res.status(400).send(
            {
               responseCode: 400,
               responseMessage: e,
               result: {}
            }
         )

      })



})

router.put('/resetPassword/:resettoken', function (req, res) {

   resetPassword(req).then((response) => {

      // console.log("Reset Token try", response)
      res.status(200).send(
         {
            responseCode: 200,
            responseMessage: "success",
            result: response.data
         }
      )
   })
      .catch((e) => {
         // console.log("forget Token catch", e)
         res.status(400).send(
            {
               responseCode: 400,
               responseMessage: e,
               result: {}
            }
         )

      })



})



router.put('/updateDetails', protect, function (req, res) {
   console.log("TENU", req, res)
   updateUserDetails(req).then((response) => {
      console.log("updateUserDetails try", response)
      res.status(200).send(
         {
            responseCode: 200,
            responseMessage: "success",
            result: response
         }
      )
   })
      .catch((err) => {
         //Duplicate Key Error
         let message
         if (err.name === "MongoError" && err.code === 11000) {
            console.log("ELSEE", Object.keys(err.keyValue))
            // const message=`${err.keyValue} already exists`
            message = Object.keys(err.keyValue)[0] + " already exists"
         }

         console.log("updateUserDetails catch", e)
         res.status(400).send(
            {
               responseCode: 400,
               responseMessage: message,
               result: {}
            }
         )

      })



})

router.put('/updatePassword', protect, function (req, res) {
   updatePassword(req).then((response) => {
      console.log("updatePassword try", response)
      res.status(200).send(
         {
            responseCode: 200,
            responseMessage: "success",
            result: response
         }
      )
   })
      .catch((err) => {
         //Duplicate Key Error
         let message
         if (err.name === "MongoError" && err.code === 11000) {
            console.log("ELSEE", Object.keys(err.keyValue))
            // const message=`${err.keyValue} already exists`
            message = Object.keys(err.keyValue)[0] + " already exists"
         }

         console.log("updatePassword catch", e)
         res.status(400).send(
            {
               responseCode: 400,
               responseMessage: message,
               result: {}
            }
         )

      })



})


router.get('/fetchOrders', protect, function (req, res) {

   getOrders(req).then((response) => {
      console.log("FETCH ORDERS TRY", response)
      res.status(200).send(
         {
            responseCode: 200,
            responseMessage: "success",
            result: response
         }
      )

   })
      .catch((err) => {
         console.log("FETCH ORDERS CATCH", err)
         res.status(400).send(
            {
               responseCode: 400,
               responseMessage: err,
               result: {}
            }
         )


      })
})


module.exports = router
// router.route('/updatePassword').put(protect, updatePassword)
// router.route('/updateDetails').put(protect, updateUserDetails)
// router.route('/User/:id').delete(protect, authorize('admin'), deleteSingleProduct)
// router.route('/Users').get(protect, authorize('admin'), getallUsers)
// router.route('/LoggedIn').get(protect, getLoggedInUser)