const scrypt = require('scrypt');

const seconds = 0.5; //maximum amount of time in seconds scrypt will spend when computing the derived key

function hash(key) {
  return scrypt.params(seconds).then(
    (params) => scrypt.kdf(key, params)
  );
}

module.exports = {
  hash : hash
};
