const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// Récupérer tous les utilisateurs
<<<<<<< HEAD


router.get('/users', userController.getAllUsers);

=======
router.get('/allusers', userController.getAllUsers);
// modif un user
router.put('/modif', userController.updateUser);
router.delete('/delete', userController.deleteUser);
>>>>>>> upstream/modeste

module.exports = router;
