const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const Address = new mongoose.Schema({

  houseNumber:Number,
  city:String,
  state:String,
  country:String

})

// Address.save(function(err,record){
//     if(err)
//     throw err
// })


module.exports = mongoose.model('Address', Address)