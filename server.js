const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const errorHandler=require('./middleware/error')
dotenv.config({ path: './config/config.env' })

//Dev logging middle ware  
// const logger = require('./middleware/logger')
const morgan = require('morgan')
const colors = require('colors')


//CONNECT DATABASE
const connectDB = require('./config/db')
connectDB();


//ROUTE FILES
const products = require('./routes/products')
const auth = require('./routes/auth')
const orders = require('./routes/Order')
const buyer = require('./routes/Buyer')


const app = express()

//Body Parser
app.use(express.json())


if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// app.use(logger)

app.use('/ecomm', products)
app.use('/ecomm/auth', auth)
app.use('/ecomm/orders', orders)
app.use('/ecomm/users', buyer)

//Cookie Parser
app.use(cookieParser())

app.use(errorHandler)

const PORT = process.env.PORT || 5001
const server=app.listen(PORT, () => {
    console.log(`server on ${process.env.NODE_ENV} on port ${PORT}`.green.bold)

})

process.on('unhandledRejection',(err,promise)=>{
    console.log("ERROR SERVER",err)
    server.close(()=>process.exit(1))
})