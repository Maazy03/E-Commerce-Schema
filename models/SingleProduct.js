const mongoose = require('mongoose')


const SingleProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true,
        maxLength: [30, 'Name should not exceed more than 50 characters']
    },
    cost:{
        type:Number,
        required:true
    },
    ratings:{
        type:Number,
    },
    stock:{
        type:Number,
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxLength: [100, 'Name should not exceed more than 50 characters']
    },
    photo: {
        type: String,
        default: 'no-photo.jpeg'
    },
    
    // },
    // averageRating: {
    //     type: Number,
    //     min: [1, 'Must be atleast 1'],
    //     max: [10, 'Must be max 10']
    // },
    
})


module.exports = mongoose.model('Product', SingleProductSchema)