const router = require('express').Router();
const MovieController = require('../controllers/movieController');

router.get('/movies', MovieController.GetAllMovies);
router.get('/movies/:id', MovieController.GetOneMovieByID);

module.exports = router;