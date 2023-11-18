const routes = require('express').Router()
const bookControllers = require("../contollers/books")

routes.post("/", bookControllers.createbooks)
routes.get("/", bookControllers.getAll)

module.exports = routes