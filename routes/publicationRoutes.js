const express = require('express');
const publicationController = require('../controllers/publicationController');
const router = express.Router();

router.post('/upload', publicationController.uploadPub);
router.get('/all', publicationController.getAllPub);
router.delete('/delete', publicationController.deletePubByUserId);

module.exports = router;
