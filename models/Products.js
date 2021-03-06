const mongoose = require('mongoose')
// const slugify = require('slugify')


const ProductsSchema = new mongoose.Schema({
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
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxLength: [100, 'Name should not exceed more than 50 characters']
    },
    photo: {
        type: String,
        default: 'no-photo.jpeg'
    },
    // address: [{ 
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Address"
    //  }],
     user:{
         type:mongoose.Schema.Types.ObjectId,
         ref:'User',
         required:true
     }
    // },
    // averageRating: {
    //     type: Number,
    //     min: [1, 'Must be atleast 1'],
    //     max: [10, 'Must be max 10']
    // },
    
})



// const res = geocoder.geocode('29 champs elysée paris');
// console.log("MI",res)

module.exports = mongoose.model('Products', ProductsSchema)