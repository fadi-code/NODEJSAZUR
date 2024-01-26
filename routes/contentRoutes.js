const express = require('express');
const contentController = require('../controllers/contentController');
const router = express.Router();

router.post('/create', contentController.createContent);
router.get('/all', contentController.getAllContent);
router.get('/:id', contentController.getContentById);
router.delete('/:id', contentController.deleteContentById);

module.exports = router;
