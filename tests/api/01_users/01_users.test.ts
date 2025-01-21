import * as chai from "chai";
const chaiHttp = require("chai-http");
import { describe, before, it } from "mocha";
import { app } from "../../../src/app";
import { DEFAULT_USER, ENDPOINTS } from "../../../src/constants";
import { AppHelper } from "../../utils";
const { expect } = chai;
chai.use(chaiHttp);

export const generateUniqueEmail = () => {
    return `test+${new Date().getTime()}@gmail.com`;
};

describe("User login success cases", () => {
    before(function(done) {
        const timeoutId = setTimeout(() => {
            done(new Error("App initialization timeout"));
        }, 8000);

        if (app.get("ready")) {
            clearTimeout(timeoutId);
            done();
        } else {
            app.on("testEvent", () => {
                clearTimeout(timeoutId);
                done();
            });
        }
    });


    it("It should create a new user", async () => {
        const email = generateUniqueEmail();
        const MockData = {
            ...DEFAULT_USER,
            email
        };
        AppHelper.setEmail(email);
        const response = await chai.request(app).post(ENDPOINTS.USERS.CREATE).send(MockData);
        expect(response.status).equal(200);
        expect(response.body.data?.acknowledged).to.deep.equal(true);
        return true;
    });

    it("It should not create a new user", async () => {
        const email = AppHelper.getEmail();
        const MockData = {
            ...DEFAULT_USER,
            email
        };
        const response = await chai.request(app).post(ENDPOINTS.USERS.CREATE).send(MockData);
        expect(response.status).equal(400);
        return true;
    });

    it("It should not allow to login user ", async () => {
        const email = AppHelper.getEmail();
        const MockData = {
            email,
            password: "123456"
        };
        const response = await chai.request(app).post(ENDPOINTS.USERS.LOGIN).send(MockData);
        expect(response.status).equal(400);
        return true;
    });

    it("It should allow to login user ", async () => {
        const email = AppHelper.getEmail();
        const MockData = {
            email,
            password: DEFAULT_USER.password
        };
        const response = await chai.request(app).post(ENDPOINTS.USERS.LOGIN).send(MockData);
        AppHelper.setToken(response.body.data?.token);
        expect(response.status).equal(200);
        expect(response.body.data?.token).to.exist;
        return true;
    });
});