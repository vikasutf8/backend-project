import {asyncHandler} from '../utils/asyncHandler.js'

const registerUser = asyncHandler(async (req,res,next)=>{
      await res.status(200).json({
        message :"res.status is not a fuunction",
    })
 
})

export {registerUser}