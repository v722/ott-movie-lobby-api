export const COLLECTION_NAMES = {
    USERS: "users",
    MOVIES: "movies"
}

export const ROLES = {
    TECHNICAL_SUPPORT: "TECHNICAL_SUPPORT",
    ADMIN: "ADMIN",
}

export const DEFAULT_USER = {
    first_name: "Test",
    last_name: "Admin",
    email: "test.vss100@gmail.com",
    roles: "ADMIN",
    password: "1234567"
}

export const DEFAULT_MOVIE = {
    title: "Spiderman",
    genre: "Superhero",
    rating: 9,
    link: "http://marvel.com"
}

export const ENDPOINTS = {
    USERS: {
        CREATE: "/api/users/create",
        LOGIN: "/api/users/authenticate"
    },
    MOVIES: {
        CREATE: "/api/movies",
        FETCH_ALL: "/api/movies",
        SEARCH: "/api/movies/search",
        UPDATE: (id) => `/api/movies/${id}`,
        DELETE: (id) => `/api/movies/${id}`
    }
}

export const REDIS_KEYS = {
    MOVIES: "movies"
}