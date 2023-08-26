// File to use PM2 for multiple microservices running at same time
module.exports = {
  apps: [
    {
      name: 'auth-service',
      script: './dist/apps/auth-service/main.js',
    },
    {
      name: 'customer-service',
      script: './dist/apps/customer-service/main.js',
    },
    {
      name: 'pilot-service',
      script: './dist/apps/pilot-service/main.js',
    },
    {
      name: 'email-service',
      script: './dist/apps/email-service/main.js',
    },
    {
      name: 'walk-service',
      script: './dist/apps/api-gateway/main.js',
    },
    {
      name: 'payment-service',
      script: './dist/apps/api-gateway/main.js',
    },
    {
      name: 'api-gateway',
      script: './dist/apps/api-gateway/main.js',
    },
    // Agrega otros microservicios aquí...
  ],
};