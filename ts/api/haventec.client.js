"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ht_data_service_1 = require("../ht_data.service");
var ht_crypto_service_1 = require("../ht_crypto.service");
var ht_http_service_1 = require("../ht_http.service");
var ht_device_service_1 = require("../ht_device.service");
var HaventecAuthenticateClient = /** @class */ (function () {
    function HaventecAuthenticateClient(test) {
        this.test = test;
        this.dataService = new ht_data_service_1.HT_DataService(test);
        this.deviceService = new ht_device_service_1.HT_DeviceService();
        this.http = new ht_http_service_1.HT_HttpService();
        this.dataService.normaliseStorageService();
    }
    HaventecAuthenticateClient.prototype.initialize = function (domain, applicationUuid) {
        this.dataService.setApplicationUuid(applicationUuid);
        this.domain = domain;
    };
    HaventecAuthenticateClient.prototype.activateDevice = function (username, pin, activationToken, urlOverwrite) {
        var url = (urlOverwrite ? urlOverwrite : this.domain + '/activate/device');
        this.setCurrentUser(username);
        var requestBody = {
            activationToken: activationToken,
            deviceUuid: this.dataService.getDeviceUuid(),
            hashedPin: ht_crypto_service_1.HT_CryptoService.getBase64Hash512SaltedPin(pin, this.dataService.getSaltBits()),
            username: username
        };
        this.setApplicationUuidParameter(requestBody);
        return this.postNoAuth(url, requestBody);
    };
    HaventecAuthenticateClient.prototype.addDevice = function (username, deviceName, urlOverwrite) {
        var url = (urlOverwrite ? urlOverwrite : this.domain + '/device');
        this.setCurrentUser(username);
        if (!deviceName) {
            deviceName = this.deviceService.getDeviceName();
        }
        var requestBody = {
            deviceName: deviceName,
            username: username
        };
        this.setApplicationUuidParameter(requestBody);
        return this.postNoAuth(url, requestBody);
    };
    HaventecAuthenticateClient.prototype.activateUser = function (username, activationToken, pin, urlOverwrite, deviceName) {
        var url = (urlOverwrite ? urlOverwrite : this.domain + '/activate/user');
        this.setCurrentUser(username);
        if (!deviceName) {
            deviceName = this.deviceService.getDeviceName();
        }
        var requestBody = {
            activationToken: activationToken,
            deviceName: deviceName,
            hashedPin: ht_crypto_service_1.HT_CryptoService.getBase64Hash512SaltedPin(pin, this.dataService.getSaltBits()),
            username: username
        };
        this.setApplicationUuidParameter(requestBody);
        return this.postNoAuth(url, requestBody);
    };
    HaventecAuthenticateClient.prototype.deleteDevice = function (deviceUuid, urlOverwrite) {
        var url = (urlOverwrite ? urlOverwrite : this.domain + '/device/' + deviceUuid);
        return this.delete(url);
    };
    HaventecAuthenticateClient.prototype.lockDevice = function (deviceUuid, urlOverwrite) {
        var requestBody = {
            "locked": true
        };
        var url = (urlOverwrite ? urlOverwrite : this.domain + '/device/' + deviceUuid);
        return this.patch(url, requestBody);
    };
    HaventecAuthenticateClient.prototype.unlockDevice = function (deviceUuid, urlOverwrite) {
        var requestBody = {
            "locked": false
        };
        var url = (urlOverwrite ? urlOverwrite : this.domain + '/device/' + deviceUuid);
        return this.patch(url, requestBody);
    };
    HaventecAuthenticateClient.prototype.forgotPin = function (username, urlOverwrite) {
        var url = (urlOverwrite ? urlOverwrite : this.domain + '/forgot-pin');
        this.setCurrentUser(username);
        var requestBody = {
            deviceUuid: this.dataService.getDeviceUuid(),
            username: this.dataService.getUsername()
        };
        this.setApplicationUuidParameter(requestBody);
        return this.postNoAuth(url, requestBody);
    };
    HaventecAuthenticateClient.prototype.getCurrentUserDetails = function (urlOverwrite) {
        var url = (urlOverwrite ? urlOverwrite : this.domain + '/user/current');
        return this.http.get(url, this.getAccessToken());
    };
    HaventecAuthenticateClient.prototype.getUserDevices = function (userUuid, urlOverwrite) {
        var url = (urlOverwrite ? urlOverwrite : this.domain + '/user/' + userUuid + '/device');
        return this.http.get(url, this.getAccessToken());
    };
    HaventecAuthenticateClient.prototype.login = function (username, pin, urlOverwrite) {
        var url = (urlOverwrite ? urlOverwrite : this.domain + '/login');
        this.setCurrentUser(username);
        var requestBody = {
            authKey: this.dataService.getAuthKey(),
            deviceUuid: this.dataService.getDeviceUuid(),
            hashedPin: ht_crypto_service_1.HT_CryptoService.getBase64Hash512SaltedPin(pin, this.dataService.getSaltBits()),
            username: username
        };
        this.setApplicationUuidParameter(requestBody);
        return this.postNoAuth(url, requestBody);
    };
    HaventecAuthenticateClient.prototype.logout = function (urlOverwrite) {
        var _this = this;
        var url = (urlOverwrite ? urlOverwrite : this.domain + '/logout');
        return new Promise(function (resolve, reject) {
            _this.delete(url).then(function (data) {
                _this.dataService.invalidateToken();
                resolve(data);
            }, function (err) { reject(err); });
        });
    };
    HaventecAuthenticateClient.prototype.resetPin = function (username, resetPinToken, pin, urlOverwrite) {
        var url = (urlOverwrite ? urlOverwrite : this.domain + '/reset-pin');
        this.setCurrentUser(username);
        var requestBody = {
            deviceUuid: this.dataService.getDeviceUuid(),
            hashedPin: ht_crypto_service_1.HT_CryptoService.getBase64Hash512SaltedPin(pin, this.dataService.getSaltBits()),
            resetPinToken: resetPinToken,
            username: username
        };
        this.setApplicationUuidParameter(requestBody);
        return this.postNoAuth(url, requestBody);
    };
    HaventecAuthenticateClient.prototype.signUp = function (username, email, urlOverwrite, mobileNumber) {
        var url = (urlOverwrite ? urlOverwrite : this.domain + '/self-service/user');
        this.setCurrentUser(username);
        var requestBody = {
            email: email,
            username: username,
            mobileNumber: mobileNumber,
        };
        this.setApplicationUuidParameter(requestBody);
        return this.postNoAuth(url, requestBody);
    };
    HaventecAuthenticateClient.prototype.getHashPin = function (pin) {
        return ht_crypto_service_1.HT_CryptoService.getBase64Hash512SaltedPin(pin, this.dataService.getSaltBits());
    };
    HaventecAuthenticateClient.prototype.setStorageService = function (storageService) {
        this.dataService.setStorageService(storageService);
        this.dataService.normaliseStorageService();
    };
    HaventecAuthenticateClient.prototype.getUsername = function () {
        return this.dataService.getUsername();
    };
    HaventecAuthenticateClient.prototype.getAccessToken = function () {
        return this.dataService.getAccessToken();
    };
    HaventecAuthenticateClient.prototype.getDeviceUuid = function () {
        return this.dataService.getDeviceUuid();
    };
    HaventecAuthenticateClient.prototype.getUserUuid = function () {
        return this.dataService.getUserUuid();
    };
    HaventecAuthenticateClient.prototype.getApplicationUuid = function () {
        return this.dataService.getApplicationUuid();
    };
    HaventecAuthenticateClient.prototype.getAuthKey = function () {
        return this.dataService.getAuthKey();
    };
    HaventecAuthenticateClient.prototype.updateDataFromResponse = function (response) {
        this.dataService.updateDataFromResponse(response);
    };
    HaventecAuthenticateClient.prototype.invalidateToken = function () {
        this.dataService.invalidateToken();
    };
    HaventecAuthenticateClient.prototype.isAdmin = function () {
        return this.dataService.isAdmin();
    };
    HaventecAuthenticateClient.prototype.purge = function () {
        this.currentUser = undefined;
        this.dataService.purge();
    };
    HaventecAuthenticateClient.prototype.getDeviceName = function () {
        return this.deviceService.getDeviceName();
    };
    HaventecAuthenticateClient.prototype.setCurrentUser = function (username) {
        if (username && this.currentUser !== username) {
            this.currentUser = username;
            this.dataService.init(username);
        }
    };
    HaventecAuthenticateClient.prototype.patch = function (url, data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.patch(url, data, _this.getAccessToken()).then(function (data) {
                _this.dataService.updateDataFromResponse(data);
                resolve(data);
            }, function (err) { reject(err); });
        });
    };
    HaventecAuthenticateClient.prototype.post = function (url, data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(url, data, _this.getAccessToken()).then(function (data) {
                _this.dataService.updateDataFromResponse(data);
                resolve(data);
            }, function (err) { reject(err); });
        });
    };
    HaventecAuthenticateClient.prototype.postNoAuth = function (url, data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.postNoAuth(url, data).then(function (data) {
                _this.dataService.updateDataFromResponse(data);
                resolve(data);
            }, function (err) { reject(err); });
        });
    };
    HaventecAuthenticateClient.prototype.delete = function (url) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.delete(url, _this.getAccessToken()).then(function (data) {
                _this.dataService.updateDataFromResponse(data);
                resolve(data);
            }, function (err) { reject(err); });
        });
    };
    HaventecAuthenticateClient.prototype.setApplicationUuidParameter = function (data) {
        if (this.dataService.getApplicationUuid() && data) {
            data['applicationUuid'] = this.dataService.getApplicationUuid();
        }
    };
    return HaventecAuthenticateClient;
}());
exports.HaventecAuthenticateClient = HaventecAuthenticateClient;
