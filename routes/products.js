
const express = require('express')

const router = express.Router()

//Protected Route intialization
const { protect, authorize } = require('../middleware/auth')

//PRODUCTS CONTROLLER
const { getProducts, createProduct, getSingleProduct, deleteSingleProduct, updateProduct, getSingleVendorProducts } =
    require('../controller/Products')
const { response } = require('express')



const app = express()


//PRODUCT APIS

//ADDING A PRODUCT
router.post('/AddProduct', protect, function (req, res) {

    createProduct(req).then((response) => {
        console.log("TRY ADD PRODUCT", response)
        res.status(200).send(
            {
                responseCode: 200,
                responseMessage: "success",
                result: response
            }
        )

    })
        .catch((err) => {
            console.log("CATCH ADD PRODUCT", err)

            res.status(400).send(
                {
                    responseCode: 400,
                    responseMessage: err,
                    result: {}
                }
            )
        })


})

//GET ALL PRODUCTS
router.get('/Products', function (req, res) {

    getProducts(req).then((response) => {

        res.status(200).json({
            responseCode: 200,
            responseMessage: "success",
            result: response
        })

    })
        .catch((err) => {
            res.status(404).json({
                responseCode: 200,
                responseMessage: err,
                result: {}
            })

        })

})


//GET SINGLE PRODUCT
router.get('/Product/:id', protect, function (req, res) {
    getSingleProduct(req).then((response) => {
        console.log("TRT", response)
        res.status(200).json({
            responseCode: 200,
            responseMessage: "success",
            result: response
        })
    })
        .catch((err) => {
            console.log("err---", err)
            res.status(err.status).json({
                responseCode: err.status,
                responseMessage: err.message,
                result: {}
            })
        })
})


//DELETING SINGLE PRODUCT
router.delete('/Product/:id', protect, function (req, res) {
    deleteSingleProduct(req).then((response) => {
        // console.log("TRT", response)
        res.status(200).json({
            responseCode: 200,
            responseMessage: "success",
            result: response
        })
    })
        .catch((err) => {
            // console.log("err---", err)
            res.status(err.status).json({
                responseCode: err.status,
                responseMessage: err.message,
                result: {}
            })
        })
})

//DELETING SINGLE PRODUCT
router.put('/Product/:id', protect, function (req, res) {
    updateProduct(req).then((response) => {
        console.log("TRT", response)
        res.status(200).json({
            responseCode: 200,
            responseMessage: "success",
            result: response
        })
    })
        .catch((err) => {
            console.log("err---", err)
            res.status(err.status).json({
                responseCode: err.status,
                responseMessage: err.message,
                result: {}
            })
        })
})




router.get('/vendorProducts', protect, function (req, res) {
    getSingleVendorProducts(req).then((response) => {
        console.log("TRT", response)
        res.status(200).json({
            responseCode: 200,
            responseMessage: "success",
            result: response
        })
    })
        .catch((err) => {
            console.log("err---", err)
            res.status(err.status).json({
                responseCode: err.status,
                responseMessage: err.message,
                result: {}
            })
        })
})

// router.route('/vendorProducts').get(protect, getSingleVendorProducts)



router.route('/Product/:id').get(protect, getSingleProduct).delete(protect, deleteSingleProduct).put(protect, updateProduct)


module.exports = router


// router.route('/AddProduct').post(protect, authorize('vendor'), createProduct)
// router.route('/Products').get(getProducts)