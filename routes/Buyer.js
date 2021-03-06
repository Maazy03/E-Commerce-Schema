
const express = require('express')

const router = express.Router()

//Protected Route intialization
const { protect, authorize } = require('../middleware/auth')


//USER CONTROLLER
const { registerBuyer, loginBuyer } = require('../controller/Buyer')

const app = express()


router.post('/Signup', function (req, res) {
    registerBuyer(req).then((response) => {
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
        // console.log("REG ERR", err)
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
    loginBuyer(req).then((response) => {
        console.log("LOGIN TRY", response)

        res.status(200).send(
            {
                responseCode: 200,
                responseMessage: "success",
                result: response
            }
        )


    }).catch((err) => {
        console.log("LOGIN CATCH", err)
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