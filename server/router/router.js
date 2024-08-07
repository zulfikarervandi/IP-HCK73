const express = require("express");
const router = express.Router();
const isAuthenticate = require('../middleware/isAuthentication');
const UserController = require("../controller/userController");


router.post('/add-user', UserController.register)
router.post('/login', UserController.login)
router.put('/user/:id', isAuthenticate, UserController.updateUser)

module.exports = router