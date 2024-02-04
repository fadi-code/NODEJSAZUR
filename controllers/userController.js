const User = require('../models/user');

// Fonction pour ajouter un commentaire à un contenu
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get users' });
    }
};

