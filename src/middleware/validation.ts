import { validationResult } from "express-validator";

export function checkValidationResult(req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    } else {
        return res.status(400).json({ errors: errors.array() });
    }
}