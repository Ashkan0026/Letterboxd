
const MovieService = require('../services/movieService');

class MoviesController {
    constructor() {
        this.movieService = new MovieService();
    }
    
    // get all movies 
    async getMovies(req, res){
      try{
          // extract query parameters
          const { genre, from_published_year, to_published_year, from_rate, to_rate } = req.query;
          // Call the movie service
          let movies = (await this.movieService.getMovies(genre, from_published_year, to_published_year, from_rate, to_rate)).movies;

          // return all movies
          return res.status(200).json({ movies });
      } catch(error){
        res.status(401).json({message: error.message});
      }
    }

    // Get user's favorite movies (Extract user_id from JWT)
    async getFavoriteMovies(req, res) {
        try {
            const userId = req.user.id; // Extract user_id from the JWT token

            // Call the movie service to fetch user’s favorite movies
            let favoriteMovies = (await this.movieService.getReviewedMovie(userId)).favoriteMovies;
            
            return res.status(200).json({ favoriteMovies });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // add new movie
    async addMovie(req, res){
        try{
            const { title, desc, genre, published_year, images } = req.body;
            
            let admin_id = req.user.id; // Extract user_id from the JWT token

            // Call the movie service
            this.movieService.addMovie(title, desc, genre, images, published_year, admin_id);

            return res.status(204);
        } catch(error){
            res.status(401).json({message: error.message});
        }
    }

    // delete a movie
    async deleteMovie(req, res){
        try{
            const movieId = req.params.movie_id;
            let admin_id = req.user.id; // Extract user_id from the JWT token
            // Call the movie service

            this.movieService.deleteMovie(movieId);
            
            return res.status(200).json({ message: 'Movie deleted successfully' });
        } catch(error){
            res.status(401).json({message: error.message});
        }
    }

    // edit a movie
    async editMovie(req, res){
        try{
            const movieId = req.params.movie_id;
            const { title, desc, genre, published_year, images } = req.body;

            // Call the movie service
            this.movieService.editMovie(movieId, title, desc, genre, images, published_year);

            return res.status(200).json({ message: 'Movie edited successfully' });
        } catch(error){
            res.status(401).json({message: error.message});
        }
    }
}

  
module.exports = MoviesController;