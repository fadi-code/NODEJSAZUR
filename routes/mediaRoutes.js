const express = require('express');
const mediaController = require('../controllers/mediaController');
const router = express.Router();

router.post('/upload', mediaController.uploadMedia);

router.get('/medias', mediaController.getAllMedia);

router.get('/media/:id', mediaController.getMedia);



module.exports = router;
