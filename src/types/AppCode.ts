export enum AppCode {
    UserNotFound = "UserNotFound",
    UserAlreadyExist = "UserAlreadyExist",
    MovieNotFound = "MovieNotFound",
    DuplicateMovieTitleFound = "DuplicateMovieTitleFound",
    Unauthorized = "Unauthorized",
}

export function getAppCodeMessage(appCode: AppCode): string {
    switch (appCode) {
        case AppCode.UserNotFound:
            return "User not found";
        case AppCode.DuplicateMovieTitleFound:
            return "Duplicate movie title found";
        case AppCode.UserAlreadyExist:
            return "User already exist";
        case AppCode.MovieNotFound:
            return "Movie not found";
        case AppCode.Unauthorized:
            return "Unauthorized";
        default:
    }
}

/* eslint-disable @typescript-eslint/no-unused-vars */
const neverReached = (never: never) => {
    //
};