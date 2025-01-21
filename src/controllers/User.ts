import * as bcrypt from "bcrypt";
import { checkValidationResult } from "../middleware/validation";
import * as jwt from "jsonwebtoken";
import { body } from "express-validator";
import User from "../models/User";
import { ROLES } from "../constants";
import { AppError } from "../types/AppError";
import { AppCode } from "../types/AppCode";
import { config } from "../config";

export const createUser = [
    body("first_name").isString().notEmpty(),
    body("last_name").isString().notEmpty(),
    body("roles").default(ROLES.TECHNICAL_SUPPORT).isIn(Object.values(ROLES)),
    body("password").isString().notEmpty(),
    body("email").isEmail().notEmpty(),
    checkValidationResult,
    async (req, res, next) => {
        try {
            console.log("Create user started");
            const { first_name, last_name, roles, password, email } = req.body;
            const userInfo = await User.findOne({ email });
            if (userInfo) {
                throw new AppError(AppCode.UserAlreadyExist);
            }
            const password_hash = await bcrypt.hash(password, 10);
            const users = await User.collection.insertOne({
                first_name,
                last_name,
                roles: typeof roles === "string" ? roles?.split(",") : roles,
                password: password_hash,
                email,
            });
            console.log("Create user success");
            return res.json({ success: true, msg: "Create User Successfully.", data: users });
        } catch (error) {
            console.log("Create user error", error);
            return next(error);
        }
    }
];

export const loginUser = [
    body("email").exists().isEmail(),
    body("password").exists().isString(),
    checkValidationResult,
    async (req, res, next) => {
        const { email, password } = req.body;
        try {
            console.log("Login started");
            const user = await User.findOne({ email });
            if (!user) {
                throw new AppError(AppCode.UserNotFound);
            }
            const isPasswordMatch = await bcrypt.compare(password, user.password ? user.password : "");
            if (!isPasswordMatch) {
                throw new AppError(AppCode.Unauthorized);
            }
            const token = jwt.sign({
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                roles: user.roles
            }, config.JWT_SECRET, { expiresIn: config.JWT_TOKEN_EXPIRE_TIME });

            console.log("Login success");
            return res.json({ success: true, msg: "User Login Successfully.", data: { token } });
        } catch (error) {
            console.log("Login failed", JSON.stringify(error));
            next(error);
        }
    }
];