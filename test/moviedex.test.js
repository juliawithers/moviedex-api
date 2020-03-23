require('dotenv').config();
const expect = require('chai').expect;
const supertest = require('supertest');
const app = require('../app')


describe('App.js', ()=>{
    // should filter by genre, country, and avg_vote
    it('should filter by genre', ()=>{
        return supertest(app)
            .get('/movie')
            .set('Authorization','bearer'+ process.env.API_TOKEN)
            .query({genre: 'animation'})
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                    let filtered = true;
                    let i = 0;
                    // iterate once less than the length of the array
                    // because we're comparing 2 items in the array at a time
                    while (i < res.body.length - 1) {
                    // compare movie at `i` with next movie at `i + 1`
                    const movieAtI = res.body[i];
                    const movieAtIPlus1 = res.body[i + 1];
                    // if the next movie is less than the movie at i,
                    if (movieAtIPlus1.genre != movieAtI.genre) {
                        // the movies were not sorted correctly
                        filtered = false;
                        break; // exit the loop
                    }
                    i++;
                    }
                    expect(filtered).to.be.true;
            });

    });

    it('should filter by country', ()=>{
        return supertest(app)
            .get('/movie')
            .set('Authorization','bearer'+ process.env.API_TOKEN)
            .query({country: 'italy'})
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                    let filtered = true;
                    let i = 0;
                    // iterate once less than the length of the array
                    // because we're comparing 2 items in the array at a time
                    while (i < res.body.length - 1) {
                    // compare movie at `i` with next movie at `i + 1`
                    const movieAtI = res.body[i];
                    const movieAtIPlus1 = res.body[i + 1];
                    // if the next movie is less than the movie at i,
                    if (movieAtIPlus1.country < movieAtI.country) {
                        // the movies were not sorted correctly
                        filtered = false;
                        break; // exit the loop
                    }
                    i++;
                    }
                    expect(filtered).to.be.true;
            });

    });

    it('should filter by the average vote', ()=>{
        return supertest(app)
            .get('/movie')
            .set('Authorization','bearer'+ process.env.API_TOKEN)
            .query({avg_vote: 9})
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                    let filtered = true;
                    let i = 0;
                    // iterate once less than the length of the array
                    // because we're comparing 2 items in the array at a time
                    while (i < res.body.length - 1) {
                    // compare movie at `i` with next movie at `i + 1`
                    const movieAtI = res.body[i];
                    const movieAtIPlus1 = res.body[i + 1];
                    // if the next movie is less than the movie at i,
                    if (movieAtIPlus1.country != movieAtI.country) {
                        // the movies were not sorted correctly
                        filtered = false;
                        break; // exit the loop
                    }
                    i++;
                    }
                    expect(filtered).to.be.true;
            });

    })
    // errors for wrong input: we don't know specifications yet or how the UI is handled so leave these for the next iteration
    // it('should return error 400 if genre input is incorrect', ()=>{
    //     return supertest(app)
    //         .get('/movie')
    //         .query({genre: 'MISTAKE'})
    //         .expect(400)
    // });
    // it('should return error 400 if country input is incorrect', ()=>{
    //     return supertest(app)
    //         .get('/movie')
    //         .query({genre: 'MISTAKE'})
    //         .expect(400)
    // });
    // it('should return error 400 if avg_vote input is incorrect', ()=>{
    //     return supertest(app)
    //         .get('/movie')
    //         .query({genre: 'MISTAKE'})
    //         .expect(400)
    // });
    
    // full list
    it('provided no params, full movie list is rendered', ()=>{
        return supertest(app)
        .get('/movie')
        .set('Authorization','bearer'+ process.env.API_TOKEN)
        .expect(200)
    })
})
