require('dotenv').config();

const app = require('./src/app');

const port = process.env.APP_PORT || 8201;

if (require.main === module) {
  app.listen(port);
  console.log(`Server listening port ${port}...`);
} else {
  module.exports = app;
}
