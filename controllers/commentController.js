const Comment = require('../models/comment');

// Fonction pour ajouter un commentaire à un contenu
exports.addComment = async (req, res) => {
  try {
    const comment = new Comment({
      
      text: req.body.text,
      PubIdtId: req.body.PubId,
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
    const comments = await Comment.find({ PubId: req.params.PubId });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des commentaires' });
  }
};
exports.deleteCommentsByUserId = async (req, res) => {
  try {
    const authorizationHeader = req.headers.authorization;
    
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token d\'authentification manquant ou invalide' });
    }

    const token = authorizationHeader.split(' ')[1];

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.secret);
    } catch (error) {
      return res.status(401).json({ error: 'Token d\'authentification invalide' });
    }

    const userId = decodedToken.userId;
    
    const commentsToDelete = await Comment.find({ userId: userId });

    await Comment.deleteMany({ userId: userId });

    res.json({ message: 'Commentaires supprimés avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression des commentaires' });
  }
};

