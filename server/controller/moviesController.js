
const { generateToken, authenticateToken, authorizeRole } = require('../utils/jwt');

class MoviesController {
    constructor() {
    }
    
    // get all movies 
    async getMovies(req, res){
      try{
          // extract query parameters
          const { genre, from_published_year, to_published_year, from_rate, to_rate } = req.query;
          // Call the movie service
          
          // return all movies
          return res.status(200).json({ movies: [] });
      } catch(error){
        res.status(401).json({message: error.message});
      }
    }

    // Get user's favorite movies (Extract user_id from JWT)
    async getFavoriteMovies(req, res) {
        try {
            const userId = req.user.id; // Extract user_id from the JWT token

            // Call the movie service to fetch user’s favorite movies

            return res.status(200).json({ favoriteMovies: [] });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // add new movie
    async addMovie(req, res){
        try{
            const { title, genre, published_year, poster, images } = req.body;

            // Call the movie service

            // return movie id
            var movieId = 1;
            return res.status(200).json({ movieId });
        } catch(error){
            res.status(401).json({message: error.message});
        }
    }

    // delete a movie
    async deleteMovie(req, res){
        try{
            const movieId = req.params.movie_id;

            // Call the movie service

            return res.status(200).json({ message: 'Movie deleted successfully' });
        } catch(error){
            res.status(401).json({message: error.message});
        }
    }

    // edit a movie
    async editMovie(req, res){
        try{
            const movieId = req.params.movie_id;
            const { title, genre, published_year, poster, images } = req.body;

            // Call the movie service

            return res.status(200).json({ message: 'Movie edited successfully' });
        } catch(error){
            res.status(401).json({message: error.message});
        }
    }
}

  
module.exports = MoviesController;