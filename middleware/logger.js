

const logger = (req,res,next)=>{
    req.hello="HELLO WORLD"
    console.log("JU",req)
    console.log(`MIDDLE WARE RAN ${req.method}  ${req.protocol}://${req.get('host')}${req.originalUrl}`)
    next()
}

module.exports=logger