const routes = require('express').Router()
const bookControllers = require("../contollers/books")

routes.post("/", bookControllers.createbooks)
routes.get("/", bookControllers.getAll)
routes.put("/:id", bookControllers.updatebooks)
routes.delete("/:id", bookControllers.deletebooks)

module.exports = routes