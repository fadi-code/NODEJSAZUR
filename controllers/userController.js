const User = require('../models/user');
const jwt = require('jsonwebtoken');
//const config = require('../config');
require('dotenv').config();


// Fonction pour ajouter un commentaire à un contenu
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get users' });
    }
};


exports.updateUser = async (req, res) => {
    try {
        const authHeader = req.headers.authorization; // Récupérer l'en-tête Authorization
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Token JWT manquant ou malformé' });
        }
        
        const token = authHeader.split(' ')[1]; // Extraire le token JWT après le préfixe "Bearer"
        const decodedToken = jwt.verify(token, process.env.secret); // Décoder le token JWT
        const userId = decodedToken.userId; // Extraire l'ID utilisateur du token JWT
        
        const updates = req.body; // Récupérer les mises à jour des informations de l'utilisateur depuis le corps de la requête

        // Mettre à jour les informations de l'utilisateur dans la base de données
        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        res.json({ message: 'Informations utilisateur mises à jour', user: updatedUser });
    } catch (error) {
        // Afficher l'erreur dans la console pour le débogage
        console.error('Erreur lors de la mise à jour des informations utilisateur :', error);

        // Envoyer une réponse d'erreur avec le message d'erreur
        res.status(500).json({ error: 'Erreur lors de la mise à jour des informations utilisateur', errorMessage: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const authHeader = req.headers.authorization; // Récupérer l'en-tête Authorization
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Token JWT manquant ou malformé' });
        }
        
        const token = authHeader.split(' ')[1]; // Extraire le token JWT après le préfixe "Bearer"
        const decodedToken = jwt.verify(token, process.env.secret); // Décoder le token JWT
        const isAdmin = decodedToken.admin; // Vérifier si l'utilisateur est un administrateur
        if (!isAdmin) {
            return res.status(403).json({ error: 'Accès refusé. Seuls les administrateurs peuvent supprimer des utilisateurs.' });
        }

        const { username, email } = req.body;
        // Recherchez l'utilisateur par username ou email et supprimez-le de la base de données
        const deletedUser = await User.findOneAndDelete({ $or: [{ username }, { email }] });

        if (!deletedUser) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        res.json({ message: 'Utilisateur supprimé avec succès', user: deletedUser });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur :', error);
        res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur', errorMessage: error.message });
    }
};

