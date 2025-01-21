import mongoose, { Schema } from "mongoose";
import { IMovie } from "../interfaces/Movie";
import { COLLECTION_NAMES } from "../constants";

const movieModel = new Schema<IMovie>(
    {
        title: {
            type: String,
            required: true
        },
        genre: {
            type: String
        },
        rating: {
            type: Number,
            required: true
        },
        link: {
            type: String,
            required: true
        },
        isDeleted: {
            type: Boolean,
        }
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" }, strict: false }
);

export default mongoose.model<IMovie>(COLLECTION_NAMES.MOVIES, movieModel);