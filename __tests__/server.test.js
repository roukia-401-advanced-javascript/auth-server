"use strict";

const { server } = require('../src/server');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server); //mock server
describe('web server', () => {

    it('should respond with 404 for not found routes', () => {
        return mockRequest.get('/anythingElseMyRoutes').then(result => {
            expect(result.status).toBe(404);
        }).catch(err => {
            console.log(err);
        });
    });
    it('should respond with 500 for bad routes', () => {
        return mockRequest.get('/bad').then(result => {
            expect(result.status).toBe(500);
        }).catch(err => {
            console.log(err);
        });
    });

    it(`signup`, async () => {
        let record = { "username": "rere", "password": "1234" };
        let results = await mockRequest.post('/signup').send(record);
        expect(results.status).toBe(201)


    });

    it(`signin`, async () => {
        let record = { "username": "rere", "password": "1234" };
        let results = await mockRequest.post('/signup').send(record);
        expect(results.status).toBe(200)
    });
})
