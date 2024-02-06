const Content = require('../models/content');
const jwt = require('jsonwebtoken');
//const config = require('../config');

exports.createContent = async (req, res) => {
  try {
    // Extraction du token d'authentification de l'en-tête Authorization
    const authorizationHeader = req.headers.authorization;

    // Vérifier si le jeton est présent dans l'en-tête Authorization
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token d\'authentification manquant ou invalide' });
    }

    // Extraire le jeton en supprimant le préfixe "Bearer "
    const token = authorizationHeader.split(' ')[1];

    // Validation et extraction de l'ID de l'utilisateur et du statut d'administrateur à partir du jeton
    const decodedToken = jwt.verify(token, process.env.secret);
    const userId1 = decodedToken.userId; // Supposons que votre token contient un champ userId
    

    // Création du contenu avec l'ID de l'utilisateur
    const content = new Content({
      title: req.body.title,
      text: req.body.text,
      userId: userId1, // Utilisation de l'ID de l'utilisateur extrait du token
    });

    // Sauvegarde du contenu dans la base de données
    const savedContent = await content.save();

    // Envoyer une réponse réussie avec le contenu créé
    res.json({ message: 'Contenu créé avec succès', content: savedContent });
  } catch (error) {
    // Gestion des erreurs et envoi d'une réponse d'erreur
    console.error('Erreur lors de la création du contenu:', error);
    res.status(500).json({ error: 'Erreur lors de la création du contenu', errorMessage: error.message });
  }
};



exports.getAllContent = async (req, res) => {
  try {
    const allContent = await Content.find();
    res.json(allContent);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des contenus',errorMessage: error.message });
  }
};

exports.getContentById = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération du contenu',errorMessage: error.message });
  }
};

exports.deleteContentById = async (req, res) => {
  try {
    const deletedContent = await Content.findOneAndDelete(req.params.id);
    if (!deletedContent) {
      return res.status(404).json({ error: 'Contenu non trouvé' });
    }
    res.json({ message: 'Contenu supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du contenu', errorMessage: error.message });
  }
};
