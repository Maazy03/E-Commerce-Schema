const Products = require('../models/Products')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')

//@desc get all bootcamps
//route /get/api/v1/bootcamps

exports.getProducts = asyncHandler(async (req, res, next) => {
    console.log("MAJNHU")
    // try {
    const allBootCamps = await Products.find()
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

exports.getBootcamp = asyncHandler(async (req, res, next) => {

    // try {
    const singleBootCamps = await Products.findById(req.params.id)
    if (!singleBootCamps) {
        return next(new ErrorResponse(`${req.params.id} is not valid`, 400))

    }
    res.status(200).json({
        sucess: true,
        data: singleBootCamps
    })

    // } catch (err) {
    //     // next(new ErrorResponse(`Bootcamp not found at ${req.params.id}`,404))
    //   next(err)

    // }
    // res.status(200).json({ sucess: true,message:`fetched at ${req.params.id}` })

})

//@desc post single bootcamps
//route /get/api/v1/bootcamps

exports.createProduct = asyncHandler(async (req, res, next) => {

    // try {
    const newBootCamp = await Products.create(req.body)
    res.status(201).json({
        sucess: true,
        data: newBootCamp
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

exports.updateBootcamp = asyncHandler(async (req, res, next) => {
    // try {
    const updateBootCamps = await Products.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    })
    if (!updateBootCamps) {
        return next(new ErrorResponse(`${req.params.id} is not valid`, 400))
    }
    res.status(200).json({
        sucess: true,
        data: updateBootCamps
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

exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
    // try {
    const deleteBootCamps = await Products.findByIdAndDelete(req.params.id)
    if (!deleteBootCamps) {
        return next(new ErrorResponse(`${req.params.id} is not valid`, 400))
    }
    res.status(200).json({
        sucess: true,
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