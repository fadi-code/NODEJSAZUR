const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config'); 

const app = express();
const port = config.Port;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database Connection
mongoose.connect(config.database);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur de connexion à la base de données :'));
db.once('open', () => {
  console.log('Connecté à la base de données');
});

// Routes
const authenticationRoutes = require('./routes/authenticationRoutes'); // Chemin vers les routes d'authentification
const contentRoutes = require('./routes/contentRoutes'); // Chemin vers les routes de contenu
const mediaRoutes = require('./routes/mediaRoutes'); // Chemin vers les routes de média
const commentRoutes = require('./routes/commentRoutes'); // Chemin vers les routes de commentaires

app.use('/auth', authenticationRoutes);
app.use('/content', contentRoutes);
app.use('/media', mediaRoutes);
app.use('/comment', commentRoutes);

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'écoute sur http://localhost:${port}`);
});
