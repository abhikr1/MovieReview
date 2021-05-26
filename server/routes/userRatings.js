const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');
const auth = require('../middlewares/auth');
const movie = require('../models/movie');

module.exports = router;

router.post('/:movieId', auth.authenticate, (req, res) => {
  const userId = req.session.userId;
  const user_rating = req.body.user_rating;
  const user_review = req.body.user_review;
  Movie.findOne({id: req.params.movieId}).then(movies => {
    let isPresent = movie.reviews.some((x) => {
      x.userId = userId;
    });
    if(isPresent){
      res.status(404).send({message : "Rating already present"});
    }
    movies.vote_average = (movies.vote_average /movies.vote_count+1) + (user_rating / movies.vote_count+1);
    movies.vote_count = movies.vote_count+1;
    movies.reviews.push({userId, rating : user_rating, review: user_review });
    movies.save().then(() => {
      res.status(204).send({message : "User Review added"});
    }).catch(() => {
      res.status(400).send({error : "Review mot added"});
    })
  })
})