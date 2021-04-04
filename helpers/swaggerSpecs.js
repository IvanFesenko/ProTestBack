const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'proTest API',
      version: '1.0.0',
      description: 'proTest API docs',
    },
    servers: [
      {
        url: 'http://localhost:5050',
      },
    ],
  },
  apis: ['./models/users/user.router.js'],
};

const swaggerSpecs = swaggerJsDoc(options);

module.exports = swaggerSpecs;
