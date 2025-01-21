import * as dotenv from "dotenv";
dotenv.config();
import * as cors from "cors";
import { config } from "./config";
import * as express from "express";
import initConnection from "./configuration/db";
import { router } from "./routes";
import { AppError } from "./types/AppError";

const app = express();

initConnection().then(() => {
    app.set("ready", true);
    app.use(cors());

    app.use(express.urlencoded({ extended: false }));

    app.use(express.json());

    app.use("/api", router);

    /* eslint-disable @typescript-eslint/no-unused-vars */
    app.use(async (err, req, res, next) => {
        if (err instanceof AppError) {
            return res.status(400).json({ success: false, code: err.appCode, data: JSON.stringify(err.data) });
        }
    });

    app.listen(config.NODE_ENV, () => {

        app.emit("testEvent");
        console.log("App listening at: ", config.NODE_ENV);
    });
}).catch(err => {
    console.log("Unable to connect to database: ", JSON.stringify(err, null, 2));
});

export { app };