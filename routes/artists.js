const express = require('express');
const router = express.Router();

const artistsController = require('../contollers/artists');

router.get('/', artistsController.getAll);

router.get('/:id', artistsController.getSingle);

router.post('/', artistsController.createArtists);

router.put('/:id', artistsController.updateArtists);

router.delete('/:id', artistsController.deleteArtists);

module.exports = router;