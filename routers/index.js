const router = require('express').Router();
const MovieController = require('../controllers/movieController');
const UserController = require('../controllers/userController');
const BookmarkController = require('../controllers/bookmarkController');
const authentication = require('../middlewares/authentication');


router.post('/users/register', UserController.Register);

router.post('/users/login', UserController.Login);

router.use(authentication);

router.get('/movies', MovieController.GetAllMovies);

router.get('/movies/:id', MovieController.GetMovieByID);

router.post('/movies', MovieController.CreateMovie);

router.put('/movies/:id', MovieController.UpdateMovieByID);

router.delete('/movies/:id', MovieController.DeleteMovieByID);

router.get('/mybookmark', BookmarkController.GetBookmarkByID);

router.post('/bookmarks/:id', BookmarkController.CreateBookmarkWithID);

router.delete('/bookmarks/:id', BookmarkController.DeleteBookmarkByID);


module.exports = router;