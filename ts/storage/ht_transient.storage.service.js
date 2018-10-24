"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HT_TransientStorageService = /** @class */ (function () {
    function HT_TransientStorageService() {
        this.store = {};
    }
    HT_TransientStorageService.prototype.getItem = function (key) {
        return this.store[key];
    };
    HT_TransientStorageService.prototype.removeItem = function (key) {
        this.store[key] = undefined;
    };
    HT_TransientStorageService.prototype.setItem = function (key, value) {
        this.store[key] = value;
    };
    HT_TransientStorageService.prototype.normaliseKeysToLowerCase = function () {
        if (this.store) {
            var i;
            // Create an array with the key of the elements of the local storage to normalise
            var elementToNormalise = [];
            for (i = 0; i < this.store.length; i++) {
                var key = this.store.key(i);
                if (key.startsWith('ht_')) {
                    elementToNormalise.push(key);
                }
            }
            var j;
            for (j = 0; j < elementToNormalise.length; j++) {
                var oldKey = elementToNormalise[j];
                var data = this.store.getItem(oldKey);
                var newKey = oldKey.toLowerCase();
                this.store.removeItem(oldKey);
                this.store.setItem(newKey, data);
            }
        }
    };
    return HT_TransientStorageService;
}());
exports.HT_TransientStorageService = HT_TransientStorageService;
