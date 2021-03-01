const mongoose = require('mongoose')


const OrderSchema = new mongoose.Schema({
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
   
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxLength: [100, 'Name should not exceed more than 50 characters']
    },
    photo: {
        type: String,
        default: 'no-photo.jpeg'
    },
    address: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address"
     }],
     user:{
         type:mongoose.Schema.ObjectId,
         ref:'User',
         required:true
     }
 
    
})

module.exports = mongoose.model('Orders', OrderSchema)