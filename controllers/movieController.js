const { Movie, User, Bookmark } = require('../models');

class MovieController {

    static GetAllMovies(req,res){
        Movie.findAll()
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    }

    static GetMovieByID(req,res){
        let id = +req.params.id;
        Movie.findByPk(id)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    }

    static CreateMovie(req,res){
        const {
            title,
            synopsis,
            trailerUrl,
            imgUrl,
            rating,
            status
        } =req.body;

        Movie.create({
            title,
            synopsis,
            trailerUrl,
            imgUrl,
            rating,
            status
        })
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(500).json(err);
        })
           
    }

    static UpdateMovieByID(req,res){
        let id = +req.params.id;
        const {
            title,
            synopsis,
            trailerUrl,
            imgUrl,
            rating,
            status
        } =req.body;

        let data = {
            title,
            synopsis,
            trailerUrl,
            imgUrl,
            rating,
            status
        }

        Movie.update(
            data,
            {
                where:{
                    id
                },
                returning:true
            }
        )
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json(err);
        })
           
    }

    static DeleteMovieByID(req,res){
        let id = +req.params.id;

        Movie.destroy(
            {
                where:{
                    id
                }
            }
        )
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json(err);
        })
           
    }
}

module.exports = MovieController;