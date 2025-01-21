import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/User";
import { COLLECTION_NAMES } from "../constants";

const UserModel = new Schema<IUser>(
    {
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        roles: {
            type: [String],
            required: true
        },
        password: {
            type: String,
            required: true
        },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" }, strict: false }
);

export default mongoose.model<IUser>(COLLECTION_NAMES.USERS, UserModel);
