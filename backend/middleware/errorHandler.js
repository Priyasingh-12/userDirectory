const errorHandle =(err,req,res,next) => {
    res.status(err.statuscode || 500).json({
        sucess:false,
         message: err.message,
    })
}

module.exports = errorHandle;
