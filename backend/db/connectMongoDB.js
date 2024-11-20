import mongoose, { connect } from "mongoose";

const connectMongoDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URL)
        console.log("Connect to Mongo DB success");
        
    } catch (error) {
        console.log("Error: " , error.message );
    }
}

export default connectMongoDB