const express = require('express');
const routes = express.Router();

const artistsController = require('../contollers/artists');

routes.get('/', artistsController.getAll);

routes.get('/:id', artistsController.getSingle);

routes.post('/', artistsController.createArtists);

routes.put('/:id', artistsController.updateArtists);

routes.delete('/:id', artistsController.deleteArtists);

module.exports = routes;