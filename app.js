const express = require('express');
const axios = require('axios');
const path = require('path');
var genuuid = require('uuid').v4;
const session = require('express-session');
const MongoStore = require('connect-mongo');
const Movie = require('./server/models/movie');

const app = express();

const api = require('./server/api');
const db = require('./server/db');

//Configure .env
require('dotenv').config();

//Set port as process.env.PORT if it is present otherwise set it to 4000
const port = process.env.PORT || 4000;

//Initiate connection with database
db.connect({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
}).then(() => {
    //Handle /api with the api middleware
    app.use('/api', session({
        genid() {
            return genuuid() // use UUIDs for session IDs
        },
        store: new MongoStore({ client: db.getClient() }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    }), api);

    //Handle non-api routes with static build folder
    app.use(express.static(path.join(__dirname, 'build')));

    //Return index.html for routes not handled by build folder
    app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
    try{
    for(let page = 0; page < 1; page ++){
        axios(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=b9e3a82efaa48fa4eb8f38e76a4937c1&page=${page}`)
        .then((response) => {
            console.log("xxxxxxxxxxxxxxxxxxxxxxxxx");
            console.log(response)
            for(let i = 0 ; i < response.data.length; i++)
            {
                const movies = new Movie({
                    adult : response.results[i].adult,
                    backdrop_path : `https://image.tmdb.org/t/p/w500${response[i].backdrop_path}`,
                    genre_ids : response.data.results[i].genre_ids,
                    id: response.data.results[i].id,
                  original_language: response.data.results[i].original_language,
                original_title: response.data.results[i].original_title,
                overview: response.data.results[i].overview,
                popularity: response.data.results[i].popularity,
                 poster_path: `https://image.tmdb.org/t/p/w500${response.data.results[i].poster_path}`,
                  release_date: response.data.results[i].release_date,
                  title: response.data.results[i].title,
                  video: response.data.results[i].video,
                  vote_average: response.data.results[i].vote_average,
                  vote_count: response.data.results[i].vote_count,
                 });
                 movies.save().then((savedDoc) => {
                    console.log("Saved");
                  }).catch((err) => {
                    console.log(`Not saved ${err.response}`);
                  })

        }
    })
}
    }
    catch{
        console.log("error in code-------")
    }
    //Start listening on port
    app.listen(port, () => {
        console.log(`Server listening at port: ${port}`);
    });
});