const serverless = require('serverless-http');
const app = require('../../server'); // Import the standard Express app

// Wrap the Express app for Netlify
module.exports.handler = serverless(app, {
  basePath: '/.netlify/functions/api'
});
