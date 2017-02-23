const scrypt = require('scrypt');

const seconds = 0.5; //maximum amount of time in seconds scrypt will spend when computing the derived key
const hashEncoding = "base64";

function hash(key) {
  return scrypt.params(seconds).then(
    (params) => scrypt.kdf(key, params).then(
      (result) => result.toString(hashEncoding)
    )
  );
}

function verify(password, storedHash, cb) {  
  return scrypt.verifyKdf(
    new Buffer(storedHash, hashEncoding),
    new Buffer(password),
    cb
  );
}

module.exports = {
  hash : hash,
  verify : verify
};
