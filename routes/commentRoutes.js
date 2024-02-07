const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Endpoint pour ajouter un commentaire à un contenu
router.post('/add', commentController.addComment);

// Endpoint pour récupérer tous les commentaires d'un contenu
router.get('/:contentId', commentController.getCommentsByContentId);

router.delete('/delete', commentController.deleteCommentsByUserId);


module.exports = router;
