import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.NEXT_PUBLIC_ENCODE_ENV;

// Utils/hash.js
export function decryptText(cipherText, secretKey) {
    try {
        if (!secretKey) {
            console.error("SECRET_KEY is not defined in decryptText");
            return null;
        }

        const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);

        if (!decrypted) {
            console.error("Decryption resulted in empty string");
            return null;
        }

        return decrypted;
    } catch (err) {
        console.error("Decrypt error", err);
        return null;
    }
}

export function encryptText(text, secretKey) {
    try {
        if (!secretKey) {
            console.error("SECRET_KEY is not defined in encryptText");
            return null;
        }
        return CryptoJS.AES.encrypt(text, secretKey).toString();
    } catch (err) {
        console.error("Encrypt error", err);
        return null;
    }
}

// Add this function since it's referenced but not defined
export async function generateHash(text, secretKey) {
    return encryptText(text, secretKey);
}