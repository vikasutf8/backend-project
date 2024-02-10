import  mongoose  from "mongoose";
import { DB_NAME } from "../contants.js";

const connectDB =async ()=>{
    console.log(process.env.MONGODB_URI)
    console.log(DB_NAME)
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MONGODB error in URI :: ",error);
        process.exit(1);
    }
}

export default connectDB;
