// const asyncHandler = (requestHandler)=>{
//     return (req,res,next) =>{
//         Promise.resolve(requestHandler(res,req,next)).catch((err) =>next(err)); 
//     }
// }
// also done with tryCatch


const asyncHandler =(fun) =>async(req,res,next)=>{
    try{
        await fun(req,res,next);
    }
    catch(err){
        res.status(err.code || 500).json({
            success :false,
            message :err.message
        })
    }
}
export {asyncHandler};