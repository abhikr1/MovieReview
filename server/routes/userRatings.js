const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');
const auth = require('../middlewares/auth');
const movie = require('../models/movie');

module.exports = router;

router.post('/:movieId', (req, res) => {
  if(!req.session.userId){
    res.send({message : "Please Login First"});
    return;
  }
    
  const userId = req.session.userId;
  const user_rating = req.body.user_rating;
  const user_review = req.body.user_review;
  Movie.findOne({id: req.params.movieId}).then(movies => {
    console.log(movies);
    let isPresent = movies.reviews.some((x)=> 
      x.userId == userId
    );
    console.log(isPresent)
    if(isPresent){
      res.status(404).send({message : "Rating already present"});  
      
      return;
    }
    //movies.vote_average = (movies.vote_average /movies.vote_count+1) + (user_rating / movies.vote_count+1);
    movies.vote_average = (movies.vote_average * movies.vote_count + user_rating)/movies.vote_count+1;
    movies.vote_average = Math.round(movies.vote_average * 100) / 100;
    console.log("IJportjhsdbkl")
    console.log(movies.vote_average)
    movies.vote_count = movies.vote_count+1;
    movies.reviews.push({userId, rating : user_rating, review: user_review });
    movies.save().then(() => {
      res.status(204).send({message : "User Review added"});
    }).catch(() => {
      res.status(400).send({error : "Review mot added"});
    })
  })
})