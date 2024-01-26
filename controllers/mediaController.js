const multer = require('multer');
const Media = require('../models/media');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

exports.uploadMedia = async (req, res) => {
  try {
    const media = new Media({
      filename: req.file.filename,
      uploaderId: req.body.uploaderId, // Assurez-vous d'avoir l'ID de l'utilisateur dans la requête
    });

    const savedMedia = await media.save();
    res.json({ message: 'Fichier média téléchargé avec succès', media: savedMedia });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors du téléchargement du fichier média' });
  }
};

exports.getAllMedia = async (req, res) => {
  try {
    const allMedia = await Media.find();
    res.json(allMedia);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des fichiers média' });
  }
};
