module.exports=(error,req,res,next)=>{
    
    error.statusCode = error.statusCode||400
    error.status = error.statusCode
    res.status(error.statusCode).json({
        "status":error.status,
        'message':error.message
    })
}