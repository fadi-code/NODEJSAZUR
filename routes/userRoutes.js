const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
// Récupérer tous les utilisateurs


router.get('/users', userController.getAllUsers);


module.exports = router;
