const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// Récupérer tous les utilisateurs
router.get('/allusers', userController.getAllUsers);
// modif un user
router.put('/modif', userController.updateUser);
router.delete('/delete', userController.deleteUser);

module.exports = router;
