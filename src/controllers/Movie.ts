import { checkValidationResult } from "../middleware/validation";
import { body, oneOf, param, query } from "express-validator";
import Movie from "../models/Movie";
import { AppError } from "../types/AppError";
import { AppCode } from "../types/AppCode";
import { isValidObjectId } from "mongoose";
import { ObjectId } from "mongodb";
import { redisClient } from "../configuration/redis";
import { REDIS_KEYS } from "../constants";

export const getMovies = [
    async (req, res, next) => {
        try {
            console.log("Get movies started");
            const getData = await redisClient.get(REDIS_KEYS.MOVIES);
            let items = JSON.parse(getData);
            if (!items?.length) { 
                items = await Movie.find();
                await redisClient.set(REDIS_KEYS.MOVIES, JSON.stringify(items));
            }
            // Not added pagination as it is not mentioned in the problem statement
            // const items = await Movie.find().sort({ created_at: -1 }).limit(DEFAULT_ITEMS_PER_PAGE);
            console.log("Get movies success");
            return res.json({ success: true, msg: "Get Movies Successfully", data: items });
        } catch (error) {
            console.log("Get movies error", error);
            next(error);
        }
    }
]

export const searchMovies = [
    query("q").optional({ nullable: true }),
    checkValidationResult,
    async (req, res, next) => {
        try {
            console.log("Search movies started");
            const { q } = req.query;
            let whereCondition = {};
            if (q !== "null" && q !== "undefined") {
                whereCondition = {
                    $or: [
                        { title: { $regex: q, $options: "i" } },
                        { genre: { $regex: q, $options: "i" } }
                    ]
                }
            }
            const items = await Movie.find(whereCondition);
            console.log("Search movies success");
            return res.json({ success: true, msg: "Search Movies Successfully", data: items });
        } catch (error) {
            console.log("Search movies error", error);
            next(error);
        }
    }
];

export const createMovie = [
    body("title").isString().notEmpty(),
    body("genre").isString().notEmpty(),
    body("rating").isNumeric().notEmpty(),
    body("link").isString().notEmpty(),
    checkValidationResult,
    async (req, res, next) => {
        try {
            console.log("Create movie started");
            const { title, genre, rating, link } = req.body;
            const movieInfo = await Movie.findOne({ title });
            if (movieInfo) {
                throw new AppError(AppCode.DuplicateMovieTitleFound);
            }
            const movieData = await Movie.collection.insertOne({
                title,
                genre,
                rating,
                link,
                created_at: new Date(),
                updated_at: new Date()
            });
            await redisClient.del(REDIS_KEYS.MOVIES);
            console.log("Create movie success");
            return res.json({ success: true, msg: "Create Movies Successfully", data: movieData });
        } catch (error) {
            console.log("Create movie error", error);
            next(error);
        }
    }
];

export const updateMovie = [
    param("id").custom(isValidObjectId).notEmpty(),
    oneOf([
        body("title").isString().optional({ nullable: true }),
        body("genre").isString().optional({ nullable: true }),
        body("rating").isNumeric().optional({ nullable: true }),
        body("link").isString().optional({ nullable: true }),
    ]),
    checkValidationResult,
    async (req, res, next) => {
        try {
            console.log("Update movie started");
            const { id } = req.params;
            const { title, genre, rating, link } = req.body;
            const setMovie: any = {};

            if (title) {
                setMovie.title = title;
            }
            if (genre) {
                setMovie.genre = genre;
            }
            if (rating) {
                setMovie.rating = rating;
            }
            if (link) {
                setMovie.link = link;
            }
            const movie = await Movie.findOne({ _id: new ObjectId(id), isDeleted: { $ne: true} });
            if (!movie) {
                throw new AppError(AppCode.MovieNotFound);
            }
            await Movie.updateOne(
                { _id: new ObjectId(id) },
                { $set: setMovie }
            );
            await redisClient.del(REDIS_KEYS.MOVIES);
            console.log("Update movie success");
            return res.json({ success: true, msg: "Update Movie Successfully" });
        } catch (error) {
            console.log("Update movie error", error);
            next(error);
        }
    }
];

export const deleteMovie = [
    param("id").custom(isValidObjectId).notEmpty(),
    checkValidationResult,
    async (req, res, next) => {
        try {
            console.log("Delete movie started");
            const { id } = req.params;
            await Movie.updateOne(
                { _id: new ObjectId(id) },
                { $set: { isDeleted: true } }
            );
            console.log("Delete movie success");
            return res.json({ success: true, msg: "Delete Movie Successfully" });
        } catch (error) {
            console.log("Delete movie error", error);
            next(error);
        }
    }
];