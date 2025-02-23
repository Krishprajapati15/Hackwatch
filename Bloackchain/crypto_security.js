const crypto = require("crypto");

function generateHash(data) {
  return crypto.createHash("sha256").update(data).digest("hex");
}

function signMessage(privateKey, message) {
  const sign = crypto.createSign("SHA256");
  sign.update(message);
  return sign.sign(privateKey, "hex");
}

function verifySignature(publicKey, message, signature) {
  const verify = crypto.createVerify("SHA256");
  verify.update(message);
  return verify.verify(publicKey, signature, "hex");
}

function encryptData(secretKey, data) {
  const cipher = crypto.createCipher("aes-256-cbc", secretKey);
  return cipher.update(data, "utf8", "hex") + cipher.final("hex");
}

module.exports = { generateHash, signMessage, verifySignature, encryptData };
