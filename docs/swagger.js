/* Swagger configuration */
const options = {
    openapi: 'OpenAPI 3',   
    language: 'en-US',      
    disableLogs: false,     
    autoHeaders: false,    
    autoQuery: false,      
    autoBody: false   
}

const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    version: '2.0.0',      // by default: '1.0.0'
    title: 'Social Apis',        // by default: 'REST API'
    description: 'API for Managing Social APP',  // by default: ''
    contact: {
        'name': 'API Support',
        'email': 'djelouah.fadi@supinfo.com'
    },
  },
  host: 'localhost:8080',
  basePath: '/',  // by default: '/'
  schemes: ['https'],   // by default: ['http']
  consumes: ['application/json'],  // by default: ['application/json']
  produces: ['application/json'],  // by default: ['application/json']
  tags: [        // by default: empty Array
    {
        name: 'user',
        description: ''
    }
  ],
  securityDefinitions: {},  // by default: empty object
         // by default: empty object (Swagger 2.0)
};

const outputFile = './docs/swagger.json';
const endpointsFiles = ['./index.js', './controllers/*.js', './routes/*.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);

