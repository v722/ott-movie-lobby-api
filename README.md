# OTT MOVIE LOBBY API

## Install node version 20. (https://nodejs.org)

## Install redis server.

## Install Mongo server.

## Adding .env file get reference from sample.env file.

#### Package Installation
- `$ npm install`

#### Start the project
- `$ npm run start`

#### To test the API's
- Install Postman - copy dump from ./postman_dump folder and import it.

#### API Details
1. Implemented user authentication APIs:
    - Created user API
    - Added user login API - These will enable role-based access control and authentication for movie (create and update) APIs
2. Implemented complete CRUD APIs for movies:
    - Create: Add movies document with title, genre, link, and rating
    - Read: Fetch movies details
    - Update: Modify existing movie details
    - Delete: Delete movies
    - Search: Search based on query parameters 