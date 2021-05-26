const mongoose = require("mongoose");
const { Schema } = mongoose;

const movieSchema = new Schema({
   adult : Boolean,
    backdrop_path : String,
    genre_ids : [],
    id: Number,
    original_language: String,
    original_title : String,
    overview: String,
    popularity: Number,
    poster_path: String,
    release_date: String,
    title: String,
    video:Boolean,
    vote_average: Number,
    vote_count: Number,
    reviews : [{userId: mongoose.ObjectId, rating: Number, review: String} ],
    createdAt: {
      type: Date,
      default: Date.now()
  },
    updatedAt: {
      type: Date,
      default: Date.now()
  }    
});

module.exports = mongoose.model('Movie', movieSchema);

