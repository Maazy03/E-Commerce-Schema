const ErrorResponse = require('../utils/errorResponse')

const errorHandler = (err, req, res, next) => {
    let error = { ...err }
    error.message = err.message
    console.log("jas2", err)
    console.log("jas", error)
    console.log("EHn", err.name, err.value)
    console.log("EH2", error.name, error.value, error.statusCode)

    if (err.name === "CastError") {
        console.log("if")
        const message = `Bootcamp not found at ${err.value}`
        error = new ErrorResponse(message, 404)
    }

    //Duplicate Key Error
    if (err.name === "MongoError" && err.code === 11000) {
        console.log("ELSEE", Object.keys(err.keyValue))
        // const message=`${err.keyValue} already exists`
        const message = Object.keys(err.keyValue)[0]+" already exists"
        error = new ErrorResponse(message, 400)
    }
    //Validation Error
    console.log("errrr", err.name)
    console.log("errrr2", err.errors)
    if (err.name === "ValidationError") {
        console.log("object")
        console.log("No", Object.values(error.errors))
        const message = Object.values(err.errors).map(val => val.message)
        error = new ErrorResponse(message, 400)
    }

    res.status(error.statusCode || 500).json({
        sucess: false,
        error: error.message || 'server error'
    })
}

module.exports = errorHandler