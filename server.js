const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

const port = 8000

app.get('/', (req, res) => res.send('Welcome!'))

app.listen( () => console.log(`Service App listening on port ${port}!`))