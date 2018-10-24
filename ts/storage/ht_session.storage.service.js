"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HT_SessionStorageService = /** @class */ (function () {
    function HT_SessionStorageService() {
        if (typeof (window) !== 'undefined') {
            this.store = window.sessionStorage;
        }
        else {
            throw new Error("window is not defined");
        }
    }
    HT_SessionStorageService.prototype.getItem = function (key) {
        return this.store.getItem(key);
    };
    HT_SessionStorageService.prototype.removeItem = function (key) {
        return this.store.removeItem(key);
    };
    HT_SessionStorageService.prototype.setItem = function (key, value) {
        this.store.setItem(key, value);
    };
    HT_SessionStorageService.prototype.normaliseKeysToLowerCase = function () {
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
    return HT_SessionStorageService;
}());
exports.HT_SessionStorageService = HT_SessionStorageService;
