import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

if(!process.env.MONGODB_URI){
    throw new Error("Nigga please add the MONGODB_URI in the .env file"

    );
}

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Nigga your MongoDB is connected");
    }catch (error){
        console.error("Nigga your mongodb connect has error: ", error);
        process.exit(1)
    }
}

export default connectDB
