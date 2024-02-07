const express = require('express');
const mediaController = require('../controllers/mediaController');
const router = express.Router();

router.post('/upload', mediaController.uploadMedia);
<<<<<<< HEAD

router.get('/medias', mediaController.getAllMedia);

router.get('/media/:id', mediaController.getMedia);


=======
router.get('/all', mediaController.getAllMedia);
router.delete('/delete', mediaController.deleteMediaByUserId);
>>>>>>> upstream/modeste

module.exports = router;
