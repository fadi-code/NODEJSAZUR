const Comment = require('../models/comment');

// Fonction pour ajouter un commentaire à un contenu
exports.addComment = async (req, res) => {
  try {
    const comment = new Comment({
      
      text: req.body.text,
      contentId: req.body.contentId,
    });

    const savedComment = await comment.save();
    res.json({ message: 'Commentaire ajouté avec succès', comment: savedComment });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'ajout du commentaire' });
  }
};

// Fonction pour récupérer tous les commentaires d'un contenu
exports.getCommentsByContentId = async (req, res) => {
  try {
    const comments = await Comment.find({ contentId: req.params.contentId });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des commentaires' });
  }
};
