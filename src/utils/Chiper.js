import crypto from "crypto";

const secretKey = process.env.REACT_APP_KC_SECRETKEY; // Retrieve the secret key from environment variables
if (!secretKey) {
  throw new Error("REACT_APP_KC_SECRETKEY is not defined in the environment.");
}

const ENCRYPTION_KEY = crypto.createHash("sha256").update(secretKey).digest("base64").substr(0, 32);

// const IV_LENGTH = 16;

// function encrypt(text) {
//   let iv = crypto.randomBytes(IV_LENGTH);
//   let cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY), iv);
//   let encrypted = cipher.update(text);

//   encrypted = Buffer.concat([encrypted, cipher.final()]);

//   return iv.toString("hex") + ":" + encrypted.toString("hex");
// }

function decrypt(text) {
  let textParts = text.split(":");
  let iv = Buffer.from(textParts.shift(), "hex");
  let encryptedText = Buffer.from(textParts.join(":"), "hex");
  let decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encryptedText);

  decrypted = Buffer.concat([decrypted, decipher.final()]);

  console.log("ENCRYPTION_KEY", ENCRYPTION_KEY);

  return decrypted.toString();
}

export {
  // encrypt,
  decrypt,
};
