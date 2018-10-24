
import {CryptoService} from "../../ts/crypto.service";

describe('CryptoService tests', () => {

    it('calls random and expects it to return an array of length 128', () => {

        let rand = CryptoService.random();

        expect(rand.length).toBe(128);
    });

    it('calls getBase64Hash512SaltedPin and expects it to return an 88 char string that ends in ==', () => {

        let rand = CryptoService.random();
        let hashStr = CryptoService.getBase64Hash512SaltedPin('1234', JSON.stringify(rand));

        expect(typeof hashStr).toBe("string");
        expect(hashStr.length).toBe(88);
        expect(hashStr.substring(86, 88)).toBe("==");
    });

});
