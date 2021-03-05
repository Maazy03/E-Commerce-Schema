const Products = require('../models/Products')
const Users = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const User = require('../models/User')
//@desc get all bootcamps
//route /get/api/v1/bootcamps

exports.getProducts = asyncHandler(async (req, res, next) => {

    let query
    const reqQuery = { ...query }
    const remFields = ['select', 'sort', 'page', 'limit']
    remFields.forEach(param => delete reqQuery[param])

    let quertStr = JSON.stringify(reqQuery)
    // try {
    const allBootCamps = await Products.find(req.query).populate('user', 'email username role')
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
    const singleProduct = await Products.findById(req.params.id)

    // .populate('address')
    // .exec(function (err, res) {
    //     if (err)
    //         throw err
    //     console.log("KI", res)
    // })
    console.log("SINGL PRDASADS", singleProduct)
    if (!singleProduct) {
        return next(new ErrorResponse(`${req.params.id} is not valid`, 400))

    }
    res.status(200).json({
        sucess: true,
        data: singleProduct
    })

})

exports.getSingleVendorProducts = asyncHandler(async (req, res, next) => {
    console.log("SINGLE BOOTCAMP", req.user._id)

    // try {
    const singleVendorProducts = await Products.find({ user: req.user._id }).select('-products').populate('user', 'username email')

    console.log("SSSSSSSS", singleVendorProducts)

    if (!singleVendorProducts) {
        return next(new ErrorResponse(`${req.params.id} is not valid`, 400))

    }
    res.status(200).json({
        sucess: true,
        data: singleVendorProducts
    })



})

//@desc post single bootcamps
//route /get/api/v1/bootcamps

exports.createProduct = asyncHandler(async (req, res, next) => {

    console.log("USER 011", req.user)
    console.log("USER 011qq", req.body.user)

    let user = await User.findOne({ _id: req.user.id })
    req.body.user = user._id;
    console.log("user._id", user)

    const createProduct = new Products(req.body)
    const ssavedProduct = await createProduct.save();
    console.log("ssaved product", ssavedProduct)
    user.products.push(ssavedProduct._id)
    await user.save()

    // let chec= await Products.populate(ssavedProduct, 'user')

    console.log('populated -->', ssavedProduct)
    // console.log('populated 2-->',quer)
    res.status(201).json({
        sucess: true,
        data: ssavedProduct
    })
    console.log("BOOT CAMP SUCESS")


})

//@desc update bootcamps
//route /put/api/v1/bootcamps/:id

exports.updateProduct = asyncHandler(async (req, res, next) => {
    // try {
    let updateProduct = await Products.findById(req.params.id)

    console.log("ASASasdasd", updateProduct)
    if (!updateProduct) {
        return next(new ErrorResponse(`${req.params.id} is not valid`, 400))
    }
    //Make sure the right owner is updating it's bootcamp
    console.log("BOOT CAMP IPD DUSEr", updateProduct.user, req.user.id)

    if (updateProduct.user.toString() !== req.user.id) {
        return next(new ErrorResponse(`${req.user.id} is not authroized person to update this task`, 401))

    }
    updateProduct = await Products.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        sucess: true,
        data: updateProduct
    })


})

//@desc update bootcamps
//route /put/api/v1/bootcamps/:id

exports.deleteSingleProduct = asyncHandler(async (req, res, next) => {

    let deleteProduct = await Products.findById(req.params.id)
    let deletedUSer = await Users.findById(req.user.id)
    console.log("ACCESS --::", deletedUSer.products)

    if (deletedUSer.products === req.user.id) {
        deletedUSer.products.filter()
    }
    deletedUSer.products.filter(req.user.id)
    console.log("DELTE PRODCUT", deleteProduct)
    console.log("DELTE user", deletedUSer)
    console.log("BOOT CAMP DEL", deleteProduct.user, req.user.id)


    if (!deleteProduct) {
        return next(new ErrorResponse(`${req.params.id} is not valid`, 400))
    }

    if (deleteProduct.user.toString() !== req.user.id) {
        return next(new ErrorResponse(`${req.user.id} is not auhtorized to delete this`, 401))
    }



    // deleteProduct = await Products.findByIdAndDelete(req.params.id)

    // deleteProduct.remove()

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




