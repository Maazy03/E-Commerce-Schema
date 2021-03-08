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
        product:{
            type: mongoose.Schema.ObjectId,
            ref: 'Products',
        }
        
    }],
    paymentMethod: {
        type: String,
        enum: ['COD', 'Debit Card']
    },
    shippingAddress: {
        contact: {
            type: String,
        },
        country: {
            type: String,
        },
        region: {
            type: String,
        },
        city: {
            type: String,
        },
        area: {
            type: String,
        },
        address: {
            type: String,
        },

    },
    buyer: {
        type: mongoose.Schema.ObjectId,
        ref: 'Buyer',
        // required: true
    },
})

module.exports = mongoose.model('Orders', OrderSchema)