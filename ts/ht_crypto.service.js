"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sjcl = require("@haventec/sjcl512");
var HT_CryptoService = /** @class */ (function () {
    function HT_CryptoService() {
    }
    HT_CryptoService.getBase64Hash512SaltedPin = function (pin, salt) {
        var hash512 = new sjcl.hash.sha512();
        hash512.update(JSON.parse(salt));
        hash512.update(pin);
        var hashed = hash512.finalize();
        return sjcl.codec.base64.fromBits(hashed);
    };
    HT_CryptoService.generateSalt = function () {
        return sjcl.random.randomWords(128);
    };
    return HT_CryptoService;
}());
exports.HT_CryptoService = HT_CryptoService;
