const mongodb = require('../db/connect')
const  ObjectId = require("mongodb").ObjectId


const getAll = async( req, res, next) => {
    const result = await mongodb
        .getDb()
        .db()
        .collection("handyman")
        .find();
    result.toArray().then((lists) => {
        res.setHeader("Content-Type", "application/json")
        res.status(200).json(lists)
    })
}

const createHandyman = async(req, res) => {
    const handyman = {
        name: req.body.name,
        profession: req.body.profession,
        city: req.body.city,
        tel: req.body.tel
    }

    const response = await mongodb
        .getDb()
        .db()
        .collection("handyman")
        .insertOne(handyman)

    if (response.acknowledged) {
        res.status(201).json(response)
        } else {
        res.status(500).json(response.error || 'Some error occured while entering the ward details.')
        }

}
const getProfession = async (req, res, next) => {
    const handymanProfession = req.params.profession;
    const result = await mongodb
      .getDb()
      .db()
      .collection("handyman")
      .find({ profession: handymanProfession });
    result.toArray().then((lists) => {
      res.status(200).json(lists);
    });
  };

  const updateHandyman = async (req, res) => {
    const handymanId = new ObjectId(req.params.id);

    const handyman = {
        name: req.body.name,
        profession: req.body.profession,
        city: req.body.city,
        tel: req.body.tel
    };
    const response = await mongodb
    .getDb()
    .db()
    .collection('handyman')
    .replaceOne({_id: handymanId}, handyman);
    if(response.modifiedCount > 0){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the ward.')
    }
  }
module.exports = {getAll, createHandyman, getProfession, updateHandyman}