"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ht_local_storage_service_1 = require("./ht_local.storage.service");
var ht_transient_storage_service_1 = require("./ht_transient.storage.service");
var HT_StorageService = /** @class */ (function () {
    function HT_StorageService(nobrowser) {
        if (nobrowser) {
            this._IStorage = new ht_transient_storage_service_1.HT_TransientStorageService();
        }
        else {
            this._IStorage = new ht_local_storage_service_1.HT_LocalStorageService();
        }
    }
    HT_StorageService.prototype.getItem = function (key) {
        return this._IStorage.getItem(key);
    };
    HT_StorageService.prototype.removeItem = function (key) {
        return this._IStorage.removeItem(key);
    };
    HT_StorageService.prototype.setItem = function (key, value) {
        return this._IStorage.setItem(key, value);
    };
    HT_StorageService.prototype.normaliseKeysToLowerCase = function () {
        return this._IStorage.normaliseKeysToLowerCase();
    };
    return HT_StorageService;
}());
exports.HT_StorageService = HT_StorageService;
