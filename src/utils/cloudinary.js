import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
 //unlinking

          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" }, 
//   function(error, result) {console.log(result); });


const uploadOnCloudinary  =async(localFilePath)=>{
    try {
        if(!localFilePath){
            console.log( `Could not find path :`,localFilePath);
            return null
        }
        // uploading
        const response =await cloudinary.uploader.upload(localFilePath,{
            resource_type:'auto'
        })
        // console.log("uploaded file Successfully:" ,response.url)
        // console.log("cloudinary response" ,response)
        fs.unlinkSync(localFilePath)
        // console.log("response",response)
        return response;  
    } catch (err) {
        // remove from my/local server filed
        fs.unlinkSync(localFilePath);
        console.log("File not upload and removed from local server")
        return null;
    }
}

export {uploadOnCloudinary };