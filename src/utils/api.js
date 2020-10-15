const axios = require('axios');

const api = axios.create({
  baseURL: 'http://localhost:8201',
});

module.exports = api;
