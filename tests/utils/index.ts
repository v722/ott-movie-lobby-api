export class AppHelper {
    static email;
    static title;
    static token;
    static id;

    static setEmail(email) {
        this.email = email;
        return this.email;
    }

    static getEmail() {
        return this.email;
    }

    static setTitle(title) {
        this.title = title;
        return this.title;
    }

    static getTitle() {
        return this.title;
    }

    static setToken(token) {
        this.token = token;
        return this.token;
    }

    static getToken() {
        return this.token;
    }

    static setMovieId(id) {
        this.id = id;
        return this.id;
    }

    static getMovieId() {
        return this.id;
    }

}