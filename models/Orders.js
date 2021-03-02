const mongoose = require('mongoose')


const OrderSchema = new mongoose.Schema({
    orderItems: [{
        name: {
            type: String,
            required: [true, 'Please add a name'],
            trim: true,
            maxLength: [30, 'Name should not exceed more than 50 characters']
        },
        cost: {
            type: Number,
            required: true
        },
        photo: {
            type: String,
            default: 'no-photo.jpeg'
        },
    }],
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['COD', 'Debit Card']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }


})

module.exports = mongoose.model('Orders', OrderSchema)