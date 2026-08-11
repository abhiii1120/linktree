import mongoose from "mongoose";
import config from "../config/config.js";

const connectDB = async() => {
    try {
        await mongoose.connect(config.MONGO_URI);
        console.log('connected to db')
    } catch (error) {
        console.log("Error while connecting to db",error);
        process.exit(1);
    }
}

export default connectDB