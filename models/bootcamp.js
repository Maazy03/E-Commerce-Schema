const mongoose = require('mongoose')
const slugify = require('slugify')
const geocoder = require('../utils/geocoder')


const BootcampSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true,
        unique: true,
        maxLength: [50, 'Name should not exceed more than 50 characters']
    },
    slug: String,
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxLength: [500, 'Name should not exceed more than 50 characters']
    },
    website: {
        type: String,
        match: [/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            'Please enter valid URL'],
    },
    phone: {
        type: String,
        maxLength: [20, 'Phone number can not be greater than 20 characters']
    },
    email: {
        type: String,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Enter a valid email']

    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    location: {
        //GEO JSON
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true,
            index: '2dsphere'
        }
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
    careers: {
        type: [String],
        required: true,
        enum: [
            'Web Development',
            'Mobile Development',
            'UI/UX',
            'Data Science',
            'Business',
            'Others'
        ]
    },
    averageRating: {
        type: Number,
        min: [1, 'Must be atleast 1'],
        max: [10, 'Must be max 10']
    },
    averageRating: Number,
    photo: {
        type: String,
        default: 'no-photo.jpeg'
    },
    housing: {
        type: Boolean,
        default: false
    },
    jobAssistance: {
        type: Boolean,
        default: false
    },
    jobGuarantee: {
        type: Boolean,
        default: false
    },
    acceptGi: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

})
//Creating Slug
BootcampSchema.pre('save', function (next) {
    console.log("SLugifyran", this.name)
    this.slug = slugify(this.name, { lower: true })
    next()
})
//GeoCode & create Location field


// const res = geocoder.geocode('29 champs elysée paris');
// console.log("MI",res)

BootcampSchema.pre('save', async function(next) {

    console.log("loc", this.address)
    console.log("loc2", geocoder)

    const loc = await geocoder.geocode(this.address)
    console.log("ASUS",loc[0].latitude,loc[0].longitude)
    this.location = {
        type: 'Point',
        coordinates: [loc[0].latitude,loc[0].longitude],
        formattedAddress: loc[0].formattedAddress,
        street: loc[0].streetName,
        state: loc[0].stateCode,
        city: loc[0].city,
        country: loc[0].countryCode,
        zipcode: loc[0].zipCode,
    }
    console.log("LOCAADS",this.location)
    this.address=undefined
    next()
})



module.exports = mongoose.model('BootCamp', BootcampSchema)