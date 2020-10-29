const crypto = require("crypto");

class Hash {
    constructor() {
        this.defaultAlgo = "aes-256-cbc";
        this.key = process.env.SECRET;
        this.iv = crypto.randomBytes(16);
    }

    encrypt = async (str) => {
        let cipher = await crypto.createCipheriv(this.defaultAlgo, this.key, this.iv);
        let encrypted = await cipher.update(str);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return `${this.iv.toString("hex")}:${encrypted.toString("hex")}`;
    }

    createEmailVerificationHash = async (userEmail, ttlIndays = 1) => {
        const userObj = JSON.stringify({
            email: userEmail,
            ttl: Date.now() + (86400000 * ttlIndays)
        });
        // return {
        //     iv: this.iv.toString("hex"),
        //     hash: this.encrypt(userObj)
        // }
        return this.encrypt(userObj);
    }

    decrypt = async (text="") => {
        let textParts = text.split(':');
        let iv = Buffer.from(textParts.shift(), 'hex');
        let encryptedText = Buffer.from(textParts.join(':'), 'hex');
        let decipher = crypto.createDecipheriv(this.defaultAlgo, this.key, iv);
        let decrypted = decipher.update(encryptedText);
       
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return JSON.parse(decrypted.toString());
    }
}

global.Hash = new Hash();

module.exports = global.Hash;