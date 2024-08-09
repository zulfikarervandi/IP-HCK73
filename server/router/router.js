const express = require("express");
const router = express.Router();
const isAuthenticate = require('../middleware/isAuthentication');
const UserController = require("../controller/userController");
const MovieController = require("../controller/movieController");


router.get('/ai-helper', MovieController.geminiAi)
router.post('/auth/google', UserController.gLogin)
router.post('/add-user', UserController.register)
router.post('/login', UserController.login)
router.put('/users/:id', isAuthenticate, UserController.updateUser)
router.get("/users/me", isAuthenticate, UserController.getUserById);
router.post('/favorites',isAuthenticate, MovieController.addFavorite)
router.get('/favorites',isAuthenticate, MovieController.getMovieById)
router.delete('/favorites/:id',isAuthenticate, MovieController.deleteFavorite)
router.get('/movies',isAuthenticate , MovieController.getMovies)

module.exports = router