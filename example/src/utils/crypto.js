import CryptoJS from "crypto-js";

const CRYPTO_SECRET = import.meta.env.VITE_CRYPTO_SECRET

const Crypto = {
    encrypt(data) {
        const ciphertext = CryptoJS.AES.encrypt(data, CRYPTO_SECRET).toString();
        return ciphertext
    },

    decrypt(ciphertext) {
        const bytes = CryptoJS.AES.decrypt(ciphertext, CRYPTO_SECRET);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText
    }
}

export default Crypto