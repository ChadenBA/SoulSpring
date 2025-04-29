import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async (): Promise<void> => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined in environment variables");
        }


        const conn = await mongoose.connect(process.env.MONGO_URI as string, {
            serverSelectionTimeoutMS: 30000, // Increase timeout
            socketTimeoutMS: 45000, // Increase socket timeout

            connectTimeoutMS: 30000, // Increase connection timeout

        });

    } catch (error) {
        console.error(`Database Connection Error: ${(error as Error).message}`);
    }
};

export default connectDB;
