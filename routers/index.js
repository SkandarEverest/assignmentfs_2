const router = require('express').Router();
const MovieController = require('../controllers/movieController');
const UserController = require('../controllers/userController');


router.post('/users/register', UserController.Register);

router.post('/users/login', UserController.Login);

router.get('/movies', MovieController.GetAllMovies);

router.get('/movies/:id', MovieController.GetOneMovieByID);

module.exports = router;