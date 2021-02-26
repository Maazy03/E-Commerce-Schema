const Products = require('../models/Products')
const Address = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')

//@desc get all bootcamps
//route /get/api/v1/bootcamps

exports.getProducts = asyncHandler(async (req, res, next) => {

    let query
    const reqQuery = { ...query }

    const remFields = ['select', 'sort', 'page', 'limit']
    remFields.forEach(param => delete reqQuery[param])

    let quertStr=JSON.stringify(reqQuery)
    // try {
    const allBootCamps = await Products.find(req.query)
    console.log("query", req.query)
    res.status(200).json({
        sucess: true,
        data: allBootCamps
    })

    //     } catch (err) {
    //         res.status(404).json({
    //             sucess:false,
    //             error:err.message
    //         })
    //     }

    //     // res.status(200).json({ sucess: true,message:"SUCCESFULLY ALL",hello:req.hello })
})


//@desc get single bootcamps
//route /get/api/v1/bootcamps/:id

exports.getSingleProduct = asyncHandler(async (req, res, next) => {
    console.log("SINGLE BOOTCAMP", req.params.id)

    // try {
    const singleProduct = await Products.findOne({ _id: req.params.id })
        .populate('address')
        .exec(function (err, res) {
            if (err)
                throw err
            console.log("KI", res)
        })
    if (!singleProduct) {
        return next(new ErrorResponse(`${req.params.id} is not valid`, 400))

    }
    res.status(200).json({
        sucess: true,
        data: singleProduct
    })



})

//@desc post single bootcamps
//route /get/api/v1/bootcamps

exports.createProduct = asyncHandler(async (req, res, next) => {

    // try {
    const createProduct = await Products.create(req.body)
    res.status(201).json({
        sucess: true,
        data: createProduct
    })
    console.log("BOOT CAMP SUCESS")

    // } catch (err) {
    //     console.log("BOOT CAMP FAIL",err.message)
    //     // res.status(400).json({
    //     //     sucess:false,
    //     //     data:'',
    //     //     error:error.message
    //     // })
    //     next(err)

    // }

})

//@desc update bootcamps
//route /put/api/v1/bootcamps/:id

exports.updateProduct = asyncHandler(async (req, res, next) => {
    // try {
    const updateProduct = await Products.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    })
    if (!updateProduct) {
        return next(new ErrorResponse(`${req.params.id} is not valid`, 400))
    }
    res.status(200).json({
        sucess: true,
        data: updateProduct
    })

    // } 
    // catch (err) {
    //     console.log("UPDATE ERROR",err.message)
    //     // res.status(404).json({
    //     //     sucess:false,
    //     //     error:err.message
    //     // })
    //     next(err)

    // }

})

//@desc update bootcamps
//route /put/api/v1/bootcamps/:id

exports.deleteSingleProduct = asyncHandler(async (req, res, next) => {
    // try {
    const deleteProduct = await Products.findByIdAndDelete(req.params.id)
    if (!deleteProduct) {
        return next(new ErrorResponse(`${req.params.id} is not valid`, 400))
    }
    res.status(200).json({
        sucess: true,
        message: `${req.params.id} is succesfully deleted`,
        data: {}
    })

    // } catch (err) {
    //     console.log("DELETE ERROR",err.message)
    //     // res.status(404).json({
    //     //     sucess:false,
    //     //     error:err.message
    //     // })
    //     next(err)

    // }

})




