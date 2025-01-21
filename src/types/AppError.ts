import { AppCode, getAppCodeMessage } from "./AppCode";

export class AppError extends Error {
    public readonly appCode: AppCode;

    constructor(appCode: AppCode) {
        super(getAppCodeMessage(appCode));
        this.name = AppError.name;
        this.appCode = appCode;
    }
}
