const routes = require('express').Router()

// routes.use("/artists", require('./artists'))
// routes.use("/books", require("./books"))
// routes.use("/handymen", require("./handymen"))
// routes.use("cars", require("./cars"))
routes.use("/", (req, res) => {
    res.sendFile("index.html", {root: "./homepage"})
})
module.exports = routes