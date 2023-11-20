const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db('serveapp1').collection('music').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('serveapp1').collection('music').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createArtists = async (req, res) => {
  const artists = {
    name: req.body.name,
    genre: req.body.genre,
    releaseDate: req.body.releaseDate,
    album: req.body.album,
  };
  const response = await mongodb.getDb().db('serveapp1').collection('music').insertOne(artists);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the artists.');
  }
};

const updateArtists = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const artists = {
    name: req.body.name,
    genre: req.body.genre,
    releaseDate: req.body.releaseDate,
    album: req.body.album,
  };
  const response = await mongodb
    .getDb()
    .db('serveapp1')
    .collection('music')
    .replaceOne({ _id: userId }, artists);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the artist.');
  }
};

async function deleteArtists(req, res) {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db('serveapp1').collection('music').deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the artist.');
  }
}

module.exports = {
  getAll,
  getSingle,
  createArtists,
  updateArtists,
  deleteArtists
};