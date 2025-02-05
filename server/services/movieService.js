const db = require("../db/mainDB")
const {Movie} = require("../model/movies")
const { generateToken, authenticateToken, authorizeRole } = require('../utils/jwt');

class MovieService {
    constructor() {
        this.db = db
    }

    async getMovies(genre, from_published_year, to_published_year, from_rate, to_rate) {
        try
        {
            let res = db.getMovies()
            if(!res.success)
            {
                console.log(res.message)
                return []
            }
            let movies = res.movies
            console.log(to_rate, from_rate)
            // filter movies
            if (genre && genre !== "All Genres") {
                movies = movies.filter(movie => movie.genre.toLowerCase().indexOf(genre.toLowerCase()) !== -1)
            }
            if (from_published_year) {
                movies = movies.filter(movie => movie._build_year >= from_published_year)
            }
            if (to_published_year) {
                movies = movies.filter(movie => movie._build_year <= to_published_year)
            }
            if (from_rate) {
                movies = movies.filter(movie => movie._rate >= from_rate)
            }
            if (to_rate) {
                movies = movies.filter(movie => movie._rate <= to_rate)
            }

            return movies
        } catch (error){
            throw(error)
        }
    }

    async getMovieById(id) {
        try
        {
            let movie = db.getReveiwedMovie(id)
            return movie
        } catch (error){
            throw(error)
        }
    }

    async addMovie(title, desc, genr, images, year, admin_id) {
        try
        {
            // save file in path
            // let poster = saveFile(images.poster)
            let path = ""

            let movie = new Movie(0, title, desc, genr, path, year, admin_id)
            let res = db.insertMovie(movie)
            if(!res.success)
            {
                console.log(res.message)
            }
            return 0
        } catch (error){
            throw(error)
        }
    }

    async updateMovie(id, title, desc, genr, images, year) {
        try
        {
            let movie = new Movie(id, title, desc, genr, path, year)
            let res = db.editMovie(movie)
            return res.movie_id
        } catch (error){
            throw(error)
        }
    }

    async deleteMovie(id) {
        try
        {
            let res = db.deleteMovie(id)
            return res.movie_id
        } catch (error){
            throw(error)
        }
    }

    async getReviewedMovie(userId){
        try{
            let movies = db.getReveiwedMovie(userId);
            return movies
        } catch (error){
            throw(error)
        }
    }

    async editMovie(movieId, title, desc, genre, images, published_year) {
        try {
            const movie = new Movie(movieId, title, desc, genre, images, published_year, 0)
            const result = db.editMovie(movie)
            if(!result.success)
            {
                console.log(result.message)
            }
        } catch(error) {
            throw(error)
        }
    }
}

module.exports = MovieService