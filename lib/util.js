const bcrypt = require('bcrypt');

exports.hashingPass = async (pass) => (
  new Promise((resolve) => {
    bcrypt.hash(pass, 10, (err, hash) => {
      resolve(hash);
    })
  })
);