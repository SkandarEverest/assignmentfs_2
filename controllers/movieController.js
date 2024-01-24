const { Movie, User, Bookmark } = require('../models');

class MovieController {
    static GetAllMovies(req,res){
        User.findAll(
            {
                include: 'movies'
        
            }
        )
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    }

    static GetOneMovieByID(req,res){
        let id = +req.params.id;
        Movie.findByPk(id)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    }
}

module.exports = MovieController;