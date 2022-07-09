const { codegen } = require('swagger-axios-codegen');

codegen({
  methodNameMode: 'operationId',
  source: require('../../backend/swagger.json'),
  outputDir: './src/services/swagger/',
});
