const Content = require('../models/content');

exports.createContent = async (req, res) => {
  try {
    const content = new Content({
      
      title: req.body.title,
      text: req.body.text,
      userId: req.body.userId, 
    });

    const savedContent = await content.save();
    res.json({ message: 'Contenu créé avec succès', content: savedContent });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création du contenu',errorMessage: error.message });
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
