"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ht_session_storage_service_1 = require("./ht_session.storage.service");
var ht_transient_storage_service_1 = require("./ht_transient.storage.service");
var HT_SessionService = /** @class */ (function () {
    function HT_SessionService(nobrowser) {
        if (nobrowser) {
            this._IStorage = new ht_transient_storage_service_1.HT_TransientStorageService();
        }
        else {
            this._IStorage = new ht_session_storage_service_1.HT_SessionStorageService();
        }
    }
    HT_SessionService.prototype.getItem = function (key) {
        return this._IStorage.getItem(key);
    };
    HT_SessionService.prototype.removeItem = function (key) {
        return this._IStorage.removeItem(key);
    };
    HT_SessionService.prototype.setItem = function (key, value) {
        return this._IStorage.setItem(key, value);
    };
    HT_SessionService.prototype.normaliseKeysToLowerCase = function () {
        return this._IStorage.normaliseKeysToLowerCase();
    };
    return HT_SessionService;
}());
exports.HT_SessionService = HT_SessionService;
