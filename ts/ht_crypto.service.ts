import * as sjcl from "@haventec/sjcl512";

export class HT_CryptoService {

    public static getBase64Hash512SaltedPin(pin: string, salt: string): string {
        let hash512 = new sjcl.hash.sha512();
        hash512.update(JSON.parse(salt));
        hash512.update(pin);
        let hashed = hash512.finalize();

        return sjcl.codec.base64.fromBits(hashed);
    }

    public static generateSalt(): Array<number>[128] {
        return sjcl.random.randomWords(128);
    }
}
