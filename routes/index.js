const routes = require('express').Router()

routes.use('/swagger-doc', require('./swagger'))
routes.use("/artists", require('./artists'))
routes.use("/books", require("./books"))
routes.use("/cars", require("./cars"))
routes.use("/handyman", require("./handyman"))
routes.use("/auth", require("./auth"))
routes.use("/", (req, res) => {
    res.sendFile("index.html", {root: "./homepage"})
})
module.exports = routes