const Comment = require('../models/comment');
const jwt = require('jsonwebtoken');

// Fonction pour ajouter un commentaire à un contenu
exports.addComment = async (req, res) => {
  try {
    const authorizationHeader = req.headers.authorization;

    // Vérifier si le jeton est présent dans l'en-tête Authorization
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token d\'authentification manquant ou invalide' });
    }

    // Extraire le jeton en supprimant le préfixe "Bearer "
    const token = authorizationHeader.split(' ')[1];

    // Validation et extraction de l'ID de l'utilisateur et du statut d'administrateur à partir du jeton
    const decodedToken = jwt.verify(token, process.env.secret);
    const userId1 = decodedToken.userId; //  token contient un champ userId

    const comment = new Comment({
      
      text: req.body.text,
      PubId: req.body.PubId,
      iduser : userId1
    });

    const savedComment = await comment.save();
    res.json({ message: 'Commentaire ajouté avec succès', comment: savedComment });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'ajout du commentaire' });
  }
};

// Fonction pour récupérer tous les commentaires d'un contenu
exports.getCommentsByPubtId = async (req, res) => {
  try {
    const comments = await Comment.find({ PubId: req.params.PubId });
    // Extraire seulement le champ 'text' des commentaires
    const textOnly = comments.map(comment => comment.text);
    res.json(textOnly);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des commentaires' });
  }
};



exports.deleteCommentsByUserId = async (req, res) => {
  try {
    const authorizationHeader = req.headers.authorization;

    // Vérifier si le jeton est présent dans l'en-tête Authorization
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token d\'authentification manquant ou invalide' });
    }

    // Extraire le jeton en supprimant le préfixe "Bearer "
    const token = authorizationHeader.split(' ')[1];

    try {
      // Validation et extraction de l'ID de l'utilisateur à partir du jeton
      const decodedToken = jwt.verify(token, process.env.secret);
      const userId = decodedToken.userId;

      // Trouver les commentaires associés à l'utilisateur
      const commentsToDelete = await Comment.find({ iduser: userId });

      if (commentsToDelete.length === 0) {
        // Aucun commentaire trouvé pour cet utilisateur
        return res.json({ message: 'Vous n\'avez plus de commentaire' });
      }

      // Supprimer les commentaires associés à l'utilisateur
      await Comment.deleteMany({ iduser: userId });

      res.json({ message: 'Commentaires supprimés avec succès' });
    } catch (error) {
      // Gérer les erreurs de vérification du token
      console.error('Erreur lors de la vérification du token :', error.message);
      return res.status(401).json({ error: 'Token d\'authentification invalide', details: error.message });
    }
  } catch (error) {
    // Gérer les erreurs générales
    console.error('Erreur lors de la suppression des commentaires :', error.message);
    res.status(500).json({ error: 'Erreur lors de la suppression des commentaires', details: error.message });
  }
};





