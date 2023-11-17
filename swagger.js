const swaggerAutogen = require("swagger-autogen")()

const doc = {
    info: {
        title: "ServeApp API",
        description: "An API for different services"
    },
    host: "http://localhost:8000",
    schemes: "http"
}

const outputFile = "./swagger.json"
const endpointsFiles = ['./routes/index.js']



swaggerAutogen(outputFile, endpointsFiles, doc)


// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//     await import('./app.js'); // Your project's root file
//   });