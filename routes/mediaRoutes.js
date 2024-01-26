const express = require('express');
const mediaController = require('../controllers/mediaController');
const router = express.Router();

router.post('/upload', mediaController.uploadMedia);
router.get('/all', mediaController.getAllMedia);

module.exports = router;
