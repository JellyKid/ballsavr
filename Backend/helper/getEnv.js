module.exports = (key, file) => {
  const habitat = require('habitat');
  habitat.load(file);
  return new habitat(key);
};
