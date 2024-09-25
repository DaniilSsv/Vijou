const swaggerAutogen = require('swagger-autogen')();
 
const doc = {
    info: {
        title: 'Vjiou',
        description: 'API Documentation for Vjiou API',
    },
    host: "localhost:3000",
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    apis: ["./routes/*.js"],
    definitions: {
        Token: {
            token: 'string',
        },
        Error: {
            msg: 'string',
        }    
    }
};
 
const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js']
 
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log('Swagger documentation has been generated.');
});