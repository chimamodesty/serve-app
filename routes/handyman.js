const routes = require('express').Router()
const handymanControllers = require("../contollers/handyman")

routes.post("/", handymanControllers.createHandyman)
routes.get("/", handymanControllers.getAll)

module.exports = routes