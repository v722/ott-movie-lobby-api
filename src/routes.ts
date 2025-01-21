import * as express from "express";
import { createUser, loginUser } from "./controllers/User";
import { createMovie, deleteMovie, getMovies, searchMovies, updateMovie } from "./controllers/Movie";
import { checkAdminRole, verifyToken } from "./middleware/authorization";

export const router = express.Router();

// Users Endpoint
router.post("/users/create", createUser);

router.post("/users/authenticate", loginUser);

// Movies Endpoint
router.get("/movies", getMovies);

router.get("/movies/search", searchMovies);

router.post("/movies", verifyToken, checkAdminRole, createMovie);

router.put("/movies/:id", verifyToken, checkAdminRole, updateMovie);

router.delete("/movies/:id", deleteMovie);