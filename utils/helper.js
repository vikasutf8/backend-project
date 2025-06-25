import { supportedMimes } from "../config/fileSystem.js";
import { v4 as uuidv4 } from 'uuid';

import fs from "fs";


export const imageValidator =(size,mine)=>{

if(bytesToMb(size) >2){
    return "Image size should be less than 2MB"
}
else if(!supportedMimes(mine)){
    return "Image type is invalid"
}

return null;

}

export const bytesToMb=(bytes)=>{
return bytes/(1024*1024);
}


export const generateReadom =()=>{
    return uuidv4();
}

export const getImageUrl=   (ImageName)=>{
return  `${process.env.APP_URL_HTTP}/images/${ImageName}`;
}  


export const removeImage= async (imageName)=>{
    const path =process.cmd+"public/images/"+imageName; //path commign from nodejs instead of express
    if(fs.existsSync(path)){
        fs.unlinkSync(path);
    }
}


export const uploadImage= async (image)=>{
    const imgExt = image?.name.split(".");
      const imageName = generateReadom() + "." + imgExt[1];
      const uploadPath = process.cmd + "public/images/" + imageName;

      image.mv(uploadPath, (err) => {
        if (err) throw err;
      });

      return imageName;
}