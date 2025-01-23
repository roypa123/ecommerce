const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ecommerce',
      version: '1.0.0',
      description: 'It is an ecommerce app',
    },
  },

  apis: ['./src/routes/*.ts'],
};

const specs = swaggerJsdoc(options);

export default specs;

