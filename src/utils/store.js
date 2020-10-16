const Storage = require('node-storage');

module.exports = (path) => {
  return new Storage(path);
};
