


import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL).then(() => {
            console.log("mongodb running...");
        })


    } catch (error) {
        console.log("MongoDB connection error: ", error);
    }

}

export default connectDB;