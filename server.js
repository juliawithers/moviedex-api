require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet')
const cors = require('cors')
const movies = require('./movies-data-small.json')

const app = express();

app.use(morgan('dev'));
// place helmet before cors
app.use(helmet())
app.use(cors())

// validation middleware for token
// endpoint only responds when given valid Authorization header with Bearer API token value
console.log('apiToken = '+process.env.API_TOKEN)
app.use(function validateBearerToken(req,res,next) {
    console.log('validate bearer token middleware')
   
    const apiToken = process.env.API_TOKEN
    const authToken = req.get('Authorization')
    if(!authToken || authToken.split(' ')[1] !== apiToken){
        return res.status(401).json({error: 'Unauthorized request'}) 
    }
    next()
})

function handleGetMovie(req,res){
   
    // code here 

    // general security in place such ase best practice headers and support for cors
    
    let response = movies
    // query params: genre, country, avg_vote
    // genre: string, case insensitive
    if(req.query.genre){
        response = response.filter(movie=>
            movie.genre.toLowerCase().includes(req.query.genre.toLowerCase())
        )
    }

    // country: state string, case insensitive
    if(req.query.country){
        response = response.filter(movie=>
            movie.country.toLowerCase().includes(req.query.country.toLowerCase())    
        )
    }

    // avg_vote: >= supplied number
    if(req.query.avg_vote){
        response = response.filter(movie=>
            Number(movie.avg_vote) >= Number(req.query.avg_vote)  
        )
    }
    // api response is an array of full movie entries for the search results
    res.json(response)
}

app.get('/movie',handleGetMovie)

const PORT = 8000
app.listen(PORT,()=>{
    console.log('Server started on PORT 8000')
})