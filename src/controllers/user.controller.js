import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/apiError.js'
import { User } from '../models/user.model.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js'
import { ApiResponse } from '../utils/apiResponse.js'

// const registerUser = asyncHandler(async (req, res, next) => {

//   // get user details from frontent/postname
//   // 2 :- validations all possible
//   // 3 :- check if already exist :username/email  ->contact to mongodb 
//   // 4 :- files :-avatar /cover image  := multer
//   // 5 :- upload them to cloudinary ,avatar check again ->multer then cloudinary
//   // 6 :- create object :- create db entry
//   // 7 :- remove password/refresh token field in res;
//   // 8 :- check for user response
//   // 9 :-return res;
//   // else err

//   const { fullName, username, email, password } = req.body   //data handling
//   console.log("reb.body ->" ,req.body)
//   // map <=> some 2
//   if (
//     [fullName, email, username, password].some((field) => (
//       field?.trim() === "" ))) {
//     throw new ApiError(400, "All fields are required")
//   }

//   //3 
//   const existUser = await User.findOne({
//     $or: [{ username }, { email }]
//   })
//   if (existUser) {
//     throw new ApiError(409, "User already Exist")
//   }

//   //4
//   console.log("req.files ::: \n",req.files)
//   const avatarLocalPath = req.files?.avatar[0]?.path;
//   // const coverImageLocalPath = req.files?.coverImage[0]?.path;
//   let coverImageLocalPath;
//   if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0 ) {
//     // console.log("coverImage Length",req.files.coverImage.length)
//     coverImageLocalPath = req.files.coverImage[0].path
//   }

//   console.log("coverImage ::",coverImageLocalPath)
//   if (!avatarLocalPath) {
//     throw new ApiError(400, "Avatar field must required")
//   }

//   // 5  
//   const avatar = await uploadOnCloudinary(avatarLocalPath)
//   const coverImage = await uploadOnCloudinary(coverImageLocalPath);
//   console.log("coverImage :::: ",coverImage);
//   if (!avatar) {
//     throw new ApiError(400, "Avatar field must required")
//   }

//   // 6
//   const user = await User.create({
//     fullName,
//     avatar: avatar.url,
//     coverImage: coverImage?.url || "",
//     email,
//     password,
//     username: username.toLowerCase(),

//   })
//   console.log("user :: ",user)
//   // console.log(user)
//   // 7
//   const createdUser = await User.findById(user._id).select(
//     "-password -refreshToken"
//   )
//   // 8
//   if (!createdUser) {
//     throw new ApiError(500, "Something went wrong from Registering server side")
//   }

//   // 9 
//   return res.status(201).json(
//     new ApiResponse(200, createdUser, "User Register Successfully")
//   )

// })



const registerUser = asyncHandler( async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exists: username, email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res


  const {fullName, email, username, password } = req.body
  //console.log("email: ", email);

  if (
      [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
      throw new ApiError(400, "All fields are required")
  }

  const existedUser = await User.findOne({
      $or: [{ username }, { email }]
  })

  if (existedUser) {
      throw new ApiError(409, "User with email or username already exists")
  }
  //console.log(req.files);

  const avatarLocalPath = req.files?.avatar[0]?.path;
  //const coverImageLocalPath = req.files?.coverImage[0]?.path;

  let coverImageLocalPath;
  if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
      coverImageLocalPath = req.files.coverImage[0].path
  }
  

  if (!avatarLocalPath) {
      throw new ApiError(400, "Avatar file is required")
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath)

  if (!avatar) {
      throw new ApiError(400, "Avatar file is required")
  }
 

  const user = await User.create({
      fullName,
      avatar: avatar.url,
      coverImage: coverImage?.url || "",
      email, 
      password,
      username: username.toLowerCase()
  })

  const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
  )

  if (!createdUser) {
      throw new ApiError(500, "Something went wrong while registering the user")
  }

  return res.status(201).json(
      new ApiResponse(200, createdUser, "User registered Successfully")
  )

} )

export { registerUser }