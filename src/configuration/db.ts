import { config } from "../config";
import mongoose from "mongoose";

export default async function () {
    try {
        await mongoose.connect(config.DB_URL);
        console.log("Connected Successfully!");
        return true;
    } catch (error: any) {
        console.error("Connection failed error", error);
        process.exit(1);
    }
}

