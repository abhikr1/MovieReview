const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');

router.get('/', async (req, res) => {
  try {
    const PAGE_SIZE = 64;
    const page = parseInt(req.query.page || "0");
    const totalNoOfMovies = await Movie.countDocuments({});
    const movies = await Movie.find({}).limit(PAGE_SIZE).skip(PAGE_SIZE * page);
    res.json({
      totalPages: Math.ceil(totalNoOfMovies / PAGE_SIZE) - 1,
      movies
    })
  }
  catch(err) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});
router.get('/search/:movieName', (req,res) => {
const regex =  new RegExp(`${req.params.movieName}`,'i');
  Movie.find({original_title : regex }).then(
    movie => {
      res.status(200).send(movie);
      return;
    }
  )
})


router.get('/:movieId', (req, res) => {
  Movie.findOne({ id: req.params.movieId }).then(movie => {
      res.send(movie);
  }).catch(() => {
      res.status(500).send({ error: "Internal Server Error" });
  });
});

module.exports = router;