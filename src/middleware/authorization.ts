import * as jwt from "jsonwebtoken";
import { config } from "../config";
import { ROLES } from "../constants";

export const verifyToken = (req, res, next) => {
    try {
        const authorization = req.headers["authorization"];
        req.user = jwt.verify(authorization, config.JWT_SECRET);
        next();
    } catch (error) {
        console.log("error", error)
        return res.status(401).json({success: false, msg: "Unauthorized"});
    }
};

export const checkAdminRole = async (req, res, next) => {
    const isAdmin = req.user?.roles?.find(role => {
        return role === ROLES.ADMIN;
    });
    if (!isAdmin) {
        return res.status(401).json({success: false, msg: "Admin User Required"});
    }
    return next();
}