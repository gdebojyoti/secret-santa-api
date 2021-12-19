const crypto = require('crypto')

function sha1(data) {
  return crypto.createHash("sha1").update(data, "binary").digest("hex").substring(3, 38);
}

module.exports = sha1
