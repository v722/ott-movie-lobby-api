import * as chai from "chai";
const chaiHttp = require("chai-http");
import { describe, before, it } from "mocha";
import { app } from "../../../src/app";
import { DEFAULT_MOVIE, DEFAULT_USER, ENDPOINTS } from "../../../src/constants";
import { AppHelper } from "../../utils";

chai.use(chaiHttp);
const { expect } = chai;

describe("Movie related test cases", () => {

    it("It should create new movie with title", async () => {
        const MockData = {
            ...DEFAULT_MOVIE
        };
        const token = AppHelper.getToken();
        const response = await chai.request(app).post(ENDPOINTS.MOVIES.CREATE).send(MockData).set("authorization", token);
        AppHelper.setMovieId(response.body.data?.insertedId);
        expect(response.status).equal(200);
        expect(response.body.data?.acknowledged).to.deep.equal(true);
        return true;
    });

    it("It should not create movie with title", async () => {
        const MockData = {
            ...DEFAULT_MOVIE,
        };
        const token = AppHelper.getToken();
        const response = await chai.request(app).post(ENDPOINTS.MOVIES.CREATE).send(MockData).set("authorization", token);
        expect(response.status).equal(400);
        return true;
    });

    it("It should fetch movies", async () => {
        const response = await chai.request(app).get(ENDPOINTS.MOVIES.FETCH_ALL);
        expect(response.status).equal(200);
        return true;
    });

    it("It should search movies by title", async () => {
        const response = await chai.request(app).get(`${ENDPOINTS.MOVIES.SEARCH}?q=${DEFAULT_MOVIE.title}`);
        expect(response.status).equal(200);
        return true;
    });

    it("It should update movies by title", async () => {
        const id = AppHelper.getMovieId();
        const token = AppHelper.getToken();
        const MockData = {
            ...DEFAULT_MOVIE,
            title: "Spiderman2.0"
        }
        const response = await chai.request(app).put(`${ENDPOINTS.MOVIES.UPDATE(id)}`).send(MockData).set("authorization", token);
        expect(response.status).equal(200);
        return true;
    });

    it("It should delete movies by title", async () => {
        const id = AppHelper.getMovieId();
        const response = await chai.request(app).delete(`${ENDPOINTS.MOVIES.DELETE(id)}`);
        expect(response.status).equal(200);
        return true;
    });
});