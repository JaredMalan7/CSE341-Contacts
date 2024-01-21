const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
        title: 'Users Api',
        description: 'Users Api'
    },
    host: 'cse341-contacts-fz3z.onrender.com',
    schemes: ['https']
}

const outputFile = './swagger.json'
const endpointFiles = ['./routes/index.js']

swaggerAutogen(outputFile, endpointFiles, doc)