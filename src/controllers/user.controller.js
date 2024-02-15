import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/apiError.js'
import { User } from '../models/user.model.js'
import {uploadOnCloudinary } from '../utils/cloudinary.js'
import {ApiResponse} from '../utils/apiResponse.js'

const registerUser = asyncHandler(async (req, res, next) => {

  // get user details from frontent/postname
  // 2 :- validations all possible
  // 3 :- check if already exist :username/email  ->contact to mongodb 
  // 4 :- files :-avatar /cover image  := multer
  // 5 :- upload them to cloudinary ,avatar check again ->multer then cloudinary
  // 6 :- create object :- create db entry
  // 7 :- remove password/refresh token field in res;
  // 8 :- check for user response
  // 9 :-return res;
  // else err

  const { fullName, username, email, password } = req.body   //data handling
  // map <=> some 2
  if (
    [fullName, email, username, password].some((field) => (
      field?.trim() === ""
    ))
  ) {
    throw new ApiError(400, "All fields are required")
  }
  //3 
  const existUser =User.findOne({
    $or: [{username} , {email}]
  })
  if(existUser){
    throw new ApiError(409,"User already Exist")
  }

  //4
  // console.log(req.files)
  const avatarLocalPath  =req.files?.avatar[0]?.path;
  const coverImageLocalPath =req.files?.coverImage[0]?.path;

  if(!avatarLocalPath){
    throw new ApiError(400,"Avatar field must required")
  }

  // 5  
  const avatar=await uploadOnCloudinary(avatarLocalPath)
  const coverImage =await uploadOnCloudinary (coverImageLocalPath);
  if(!avatar){
    throw new ApiError(400,"Avatar field must required")
  }

  // 6
  const user =await User.create({
    fullName,
    avatar : avatar.url,
    coverImage :coverImage?.url || "",
    email,
    password,
    username :username.toLowerCase(),

  })
  console.log(user)
  // 7
  const createdUser =await User.findById(user._id).select(
    "-password -refreshToken"
  )
  // 8
  if(!createdUser){
    throw new ApiError(500,"Something went wrong from Registering server side")
  }

  // 9 
  return res.status(201).json(
    new ApiResponse(200,createdUser,"User Register Successfully")
  )

})

export { registerUser }