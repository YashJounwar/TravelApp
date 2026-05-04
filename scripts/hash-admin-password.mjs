import { randomBytes, scrypt as scryptCallback } from "crypto";
import { promisify } from "util";

const password = process.argv[2];

if (!password || password.length < 8) {
  console.error("Usage: npm run auth:hash -- \"your-secure-admin-password\"");
  process.exit(1);
}

const scrypt = promisify(scryptCallback);
const salt = randomBytes(16).toString("base64url");
const derivedKey = await scrypt(password, salt, 64);

console.log(`scrypt$${salt}$${derivedKey.toString("base64url")}`);
