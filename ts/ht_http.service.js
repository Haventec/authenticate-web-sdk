"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require("superagent");
var HT_HttpService = /** @class */ (function () {
    function HT_HttpService() {
    }
    HT_HttpService.prototype.get = function (url, access_token) {
        var self = this;
        return new Promise(function (resolve, reject) {
            request.get(url)
                .set("Authorization", "Bearer " + access_token)
                .set("Content-type", "application/json")
                .then(function (response) {
                if (self.validateResponse(response.body)) {
                    return resolve(response.body);
                }
                else {
                    return reject(response.body);
                }
            }, reject);
        });
    };
    HT_HttpService.prototype.getNoAuth = function (url) {
        var self = this;
        return new Promise(function (resolve, reject) {
            request.get(url)
                .set("Content-type", "application/json")
                .then(function (response) {
                if (self.validateResponse(response.body)) {
                    return resolve(response.body);
                }
                else {
                    return reject(response.body);
                }
            }).catch(function (error) {
                return reject(error);
            });
        });
    };
    HT_HttpService.prototype.patch = function (url, data, access_token) {
        var self = this;
        return new Promise(function (resolve, reject) {
            request.patch(url)
                .set("Authorization", "Bearer " + access_token)
                .set("Content-type", "application/json")
                .send(data)
                .then(function (response) {
                if (self.validateResponse(response.body)) {
                    return resolve(response.body);
                }
                else {
                    return reject(response.body);
                }
            }, reject);
        });
    };
    HT_HttpService.prototype.post = function (url, data, access_token) {
        var self = this;
        return new Promise(function (resolve, reject) {
            request.post(url)
                .set("Authorization", "Bearer " + access_token)
                .set("Content-type", "application/json")
                .send(data)
                .then(function (response) {
                if (self.validateResponse(response.body)) {
                    return resolve(response.body);
                }
                else {
                    return reject(response.body);
                }
            }, reject);
        });
    };
    HT_HttpService.prototype.put = function (url, data, access_token) {
        var self = this;
        return new Promise(function (resolve, reject) {
            request.put(url)
                .set("Authorization", "Bearer " + access_token)
                .set("Content-type", "application/json")
                .send(data)
                .then(function (response) {
                if (self.validateResponse(response.body)) {
                    return resolve(response.body);
                }
                else {
                    return reject(response.body);
                }
            }, reject);
        });
    };
    HT_HttpService.prototype.postNoAuth = function (url, data) {
        var self = this;
        return new Promise(function (resolve, reject) {
            request.post(url)
                .set("Content-type", "application/json")
                .send(data)
                .then(function (response) {
                if (self.validateResponse(response.body)) {
                    return resolve(response.body);
                }
                else {
                    return reject(response.body);
                }
            }).catch(function (error) {
                return reject(error);
            });
        });
    };
    HT_HttpService.prototype.delete = function (url, access_token) {
        var self = this;
        return new Promise(function (resolve, reject) {
            request.delete(url)
                .set("Authorization", "Bearer " + access_token)
                .set("Content-type", "application/json")
                .then(function (response) {
                if (self.validateResponse(response.body)) {
                    return resolve(response.body);
                }
                else {
                    return reject(response.body);
                }
            }, reject);
        });
    };
    HT_HttpService.prototype.validateResponse = function (response) {
        if (response && response.responseStatus && response.responseStatus.status &&
            response.responseStatus.status.toString().toUpperCase() === "SUCCESS") {
            return true;
        }
        else {
            return false;
        }
    };
    return HT_HttpService;
}());
exports.HT_HttpService = HT_HttpService;
