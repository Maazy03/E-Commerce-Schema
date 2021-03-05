const Products = require('../models/Products')
const Users = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const User = require('../models/User')
//@desc get all bootcamps
//route /get/api/v1/bootcamps

exports.getProducts = asyncHandler(async (req, res, next) => {
    try {

        const allBootCamps = await Products.find(req.query).populate('user', 'email username role')
        // console.log("query", req.query)
        // res.status(200).json({
        //     sucess: true,
        //     data: allBootCamps
        // })
        return allBootCamps
    }
    catch (err) {
        throw err
    }

})


//@desc get single bootcamps
//route /get/api/v1/bootcamps/:id

exports.getSingleProduct = async (req, res, next) => {
    try {

        console.log("SINGLE BOOTCAMP", req.params.id)
        const singleProduct = await Products.findById(req.params.id)

        // .populate('address')
        // .exec(function (err, res) {
        //     if (err)
        //         throw err
        //     console.log("KI", res)
        // })
        console.log("SINGL PRDASADS", singleProduct)
        if (!singleProduct) {
            // const errMsg={
            //     message:`${req.params.id} is not valid`,
            //     status:400
            // }
            throw { message: `${req.params.id} is not valid`, status: 400 }
            // return next(new ErrorResponse(`${req.params.id} is not valid`, 400))
        }
        return singleProduct

    }
    catch (err) {
        throw (err)
    }
}

//@desc get single vendor products
//route /get/api/v1/bootcamps/:id
exports.getSingleVendorProducts = asyncHandler(async (req, res, next) => {
    try {
        console.log("SINGLE BOOTCAMP", req.user._id)

        // try {
        const singleVendorProducts = await Products.find({ user: req.user._id }).select('-products').populate('user', 'username email')

        console.log("SSSSSSSS", singleVendorProducts)

        if (!singleVendorProducts) {

            throw { message: `${req.params.id} is not valid`, status: 400 }

        }
        return singleVendorProducts


    }
    catch (err) {
        throw err
    }
})

//@desc post single bootcamps
//route /get/api/v1/bootcamps

exports.createProduct = asyncHandler(async (req, res, next) => {
    try {

        console.log("USER 011", req.user)
        console.log("USER 011qq", req.body.user)

        let user = await User.findOne({ _id: req.user.id })
        req.body.user = user._id;
        console.log("user._id", user)

        const createProduct = new Products(req.body)
        const savedProduct = await createProduct.save();
        console.log("ssaved product", savedProduct)
        user.products.push(savedProduct._id)
        await user.save()

        // let chec= await Products.populate(savedProduct, 'user')

        console.log('populated -->', savedProduct)
        // console.log('populated 2-->',quer)
        return savedProduct
        console.log("BOOT CAMP SUCESS")
    }
    catch (err) {
        throw (err)
    }


})

//@desc update bootcamps
//route /put/api/v1/bootcamps/:id

exports.updateProduct = asyncHandler(async (req, res, next) => {
    try {
        let updateProduct = await Products.findById(req.params.id)
        console.log("ASASasdasd", updateProduct)
        if (!updateProduct) {
            throw { message: `${req.params.id} is not valid`, status: 400 }
        }
        //Make sure the right owner is updating it's bootcamp
        console.log("BOOT CAMP IPD DUSEr", updateProduct.user, req.user.id)

        if (updateProduct.user.toString() !== req.user.id) {
            throw { message: `${req.params.id} is not authroized person to update this task`, status: 401 }
        }

        updateProduct = await Products.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        
        return updateProduct
    }

    catch (err) {
        throw err
    }

})

//@desc update bootcamps
//route /put/api/v1/bootcamps/:id

exports.deleteSingleProduct = asyncHandler(async (req, res, next) => {
    try {
        let deleteProduct = await Products.findById(req.params.id)
        // let deletedUSer = await Users.findById(req.user.id)
        // console.log("ACCESS --::", deletedUSer.products)

        // if (deletedUSer.products === req.user.id) {
        //     deletedUSer.products.filter()
        // }
        // deletedUSer.products.filter(req.user.id)
        console.log("DELTE PRODCUT", deleteProduct)

        if (!deleteProduct) {
            throw { message: `${req.params.id} is not valid`, status: 400 }
        }

        if (deleteProduct.user.toString() !== req.user.id) {
            throw { message: `${req.params.id}  is not auhtorized to delete this`, status: 401 }
        }

        deleteProduct = await Products.findByIdAndDelete(req.params.id)
        deleteProduct.remove()

        return `${req.params.id} is succesfully deleted`
    }
    catch (err) {
        throw err
    }
})




