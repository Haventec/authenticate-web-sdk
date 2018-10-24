"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var htdata_1 = require("./model/htdata");
var ht_storage_service_1 = require("./storage/ht_storage.service");
var ht_session_service_1 = require("./storage/ht_session.service");
var ht_crypto_service_1 = require("./ht_crypto.service");
var ht_token_service_1 = require("./ht_token.service");
var htsessiondata_1 = require("./model/htsessiondata");
var HT_DataService = /** @class */ (function () {
    function HT_DataService(test) {
        this._storageService = new ht_storage_service_1.HT_StorageService(test);
        this._sessionService = new ht_session_service_1.HT_SessionService(test);
    }
    HT_DataService.prototype.init = function (username) {
        if (username) {
            this.setUsername(username);
            var data = this.getData(username);
            if (!data.saltBits) {
                this.resetSaltBits();
            }
        }
    };
    /**
     * Normalise _storageService to lower case.
     */
    HT_DataService.prototype.normaliseStorageService = function () {
        this._storageService.normaliseKeysToLowerCase();
    };
    HT_DataService.prototype.setStorageService = function (storageService) {
        this._storageService = storageService;
    };
    HT_DataService.prototype.setSessionData = function (sessionData) {
        //gets the username from local storage
        var username = this.getUsername();
        if (!this._sessionDataMap) {
            this._sessionDataMap = {};
        }
        if (username) {
            //maps the session data
            this._sessionDataMap[username.toLowerCase()] = sessionData;
            this._sessionService.setItem('ht_' + username.toLowerCase() + '_sessiondata', JSON.stringify(sessionData));
        }
    };
    HT_DataService.prototype.setData = function (username, localData) {
        if (username) {
            if (!this._localDataMap) {
                this._localDataMap = {};
            }
            this._localDataMap[username.toLowerCase()] = localData;
            // The username introduced by the user
            this.setUsername(username);
            this._storageService.setItem('ht_' + username.toLowerCase() + '_localdata', JSON.stringify(localData));
        }
    };
    HT_DataService.prototype.removeData = function (username) {
        if (username) {
            if (this._localDataMap && this._localDataMap[username.toLowerCase()]) {
                delete this._localDataMap[username.toLowerCase()];
            }
            // Remove the one from the previous version and the new with the name in lower case.
            this._storageService.removeItem('ht_' + username.toLowerCase() + '_localdata');
        }
    };
    /**
     * It could get the user/device data from the _localDataMap or _storageService. It will try first _localDataMap.
     *
     * @param username
     * @returns {HT_Data}
     */
    HT_DataService.prototype.getSessionData = function () {
        var username = this.getUsername();
        if (!username) {
            throw new Error('Username parameter is null at method getSessionData: ');
        }
        if (!this._sessionDataMap) {
            this._sessionDataMap = {};
        }
        var userSessionData = this._sessionDataMap[username.toLowerCase()];
        if (!userSessionData) {
            var data = this._sessionService.getItem('ht_' + username.toLowerCase() + '_sessiondata');
            if (data) {
                userSessionData = JSON.parse(data);
                this._sessionDataMap[username.toLowerCase()] = userSessionData;
            }
            else {
                userSessionData = new htsessiondata_1.HT_Session_Data(null, null);
            }
        }
        return userSessionData;
    };
    HT_DataService.prototype.removeSessionData = function () {
        var username = this.getUsername();
        if (this._sessionDataMap && this._sessionDataMap[username.toLowerCase()]) {
            delete this._sessionDataMap[username.toLowerCase()];
        }
        // Remove the one from the previous version and the new with the name in lower case.
        this._sessionService.removeItem('ht_' + username.toLowerCase() + '_sessiondata');
    };
    /**
     * It could get the user/device data from the _localDataMap or _storageService. It will try first _localDataMap.
     *
     * @param username
     * @returns {HT_Data}
     */
    HT_DataService.prototype.getData = function (username, skipCache) {
        if (!username) {
            throw new Error('Username parameter is null at method getData: ');
        }
        if (!this._localDataMap) {
            this._localDataMap = {};
        }
        // The new standard is the username in lower letter (e.g: ht_peter_localdata)
        var userLocalData = this._localDataMap[username.toLowerCase()];
        if (!userLocalData || skipCache) {
            // Try to get it from the Storage Service
            var data = this._storageService.getItem('ht_' + username.toLowerCase() + '_localdata');
            if (data) {
                // It was at the Storage service, so we bring it to the localDataMap
                userLocalData = JSON.parse(data);
                this._localDataMap[username.toLowerCase()] = userLocalData;
            }
            else {
                // It was not at the Storage service, so we create one blank
                userLocalData = new htdata_1.HT_Data(username, null, null, null, null, null, null, null, null, null, null);
                this.setData(username, userLocalData);
            }
        }
        return userLocalData;
    };
    HT_DataService.prototype.getUsername = function () {
        return this._storageService.getItem('haventec_username');
    };
    HT_DataService.prototype.setUsername = function (username) {
        this._storageService.setItem('haventec_username', username);
    };
    HT_DataService.prototype.removeUsername = function (username) {
        this._storageService.removeItem('haventec_username');
    };
    HT_DataService.prototype.getSaltBits = function () {
        var username = this.getUsername();
        if (username) {
            return this.getData(username).saltBits;
        }
        return null;
    };
    HT_DataService.prototype.setSaltBits = function (username, saltBits) {
        var localData = this.getData(username);
        if (localData) {
            localData.saltBits = saltBits;
            this.setData(username, localData);
        }
    };
    HT_DataService.prototype.resetSaltBits = function () {
        var username = this.getUsername();
        if (username) {
            var localData = this.getData(username);
            if (localData) {
                localData.saltBits = JSON.stringify(ht_crypto_service_1.HT_CryptoService.generateSalt());
                this.setData(username, localData);
            }
        }
    };
    HT_DataService.prototype.getAccessToken = function () {
        var username = this.getUsername();
        if (username) {
            return this.getSessionData().accessToken;
        }
        else {
            return null;
        }
    };
    HT_DataService.prototype.getDeviceUuid = function () {
        var username = this.getUsername();
        if (username) {
            return this.getData(username).deviceUuid;
        }
        return null;
    };
    HT_DataService.prototype.setDeviceUuid = function (deviceUuid) {
        var username = this.getUsername();
        if (username) {
            var localData = this.getData(username);
            if (localData) {
                localData.deviceUuid = deviceUuid;
                this.setData(username, localData);
            }
        }
    };
    HT_DataService.prototype.getUserUuid = function () {
        var userUuid = undefined;
        var username = this.getUsername();
        if (username) {
            var sessionData = this.getSessionData();
            if (sessionData) {
                //gets the access token from the session stroage
                var tokenData = ht_token_service_1.HT_TokenService.parseJwt(sessionData.accessToken);
                if (tokenData) {
                    userUuid = tokenData['userUUID'];
                }
            }
        }
        return userUuid;
    };
    HT_DataService.prototype.getApplicationUuid = function () {
        var applicationUuid = undefined;
        var username = this.getUsername();
        if (username) {
            var sessionData = this.getSessionData();
            if (sessionData) {
                var tokenData = ht_token_service_1.HT_TokenService.parseJwt(sessionData.accessToken);
                if (tokenData) {
                    applicationUuid = tokenData['applicationUUID'];
                }
            }
            if (!applicationUuid) {
                applicationUuid = this.getData(username).applicationUuid;
            }
            if (applicationUuid == null) {
                this.setApplicationUuid(undefined);
                applicationUuid = this.getData(username).applicationUuid;
            }
        }
        return applicationUuid;
    };
    HT_DataService.prototype.setApplicationUuid = function (applicationUuid) {
        var username = this.getUsername();
        if (username) {
            var localData = this.getData(username);
            if (localData) {
                localData.applicationUuid = applicationUuid;
                this.setData(username, localData);
            }
        }
    };
    HT_DataService.prototype.getAuthKey = function () {
        var username = this.getUsername();
        if (username) {
            // authKey must always be read from localStorage to avoid sync issue with the cache
            return this.getData(username, true).authKey;
        }
        return null;
    };
    HT_DataService.prototype.setAuthKey = function (authKey) {
        var username = this.getUsername();
        if (username) {
            var localData = this.getData(username);
            if (localData) {
                localData.authKey = authKey;
                this.setData(username, localData);
            }
        }
    };
    HT_DataService.prototype.updateDataFromResponse = function (response) {
        var username = this.getUsername();
        if (username) {
            var localData = this.getData(username, true);
            if (localData) {
                if (response && response['authKey']) {
                    localData.authKey = response['authKey'];
                }
                if (response && response['deviceUuid']) {
                    localData.deviceUuid = response['deviceUuid'];
                }
                if (response && response['userUuid']) {
                    localData.userUuid = response['userUuid'];
                }
                if (response && response['applicationUuid']) {
                    localData.applicationUuid = response['applicationUuid'];
                }
                localData.dataTime = new Date();
                this.setData(username, localData);
            }
            var sessionData = this.getSessionData();
            if (sessionData) {
                if (response && response['accessToken']) {
                    //puts the access token response into session data
                    sessionData.accessToken = response['accessToken']['token'];
                    sessionData.accessTokenType = response['accessToken']['type'];
                }
                this.setSessionData(sessionData);
            }
        }
    };
    HT_DataService.prototype.invalidateToken = function () {
        this.removeSessionData();
    };
    HT_DataService.prototype.purge = function () {
        var username = this.getUsername();
        if (username) {
            this.purgeUser(username);
        }
    };
    HT_DataService.prototype.purgeUser = function (username) {
        this.removeData(username);
        this.removeUsername(username);
    };
    HT_DataService.prototype.isAdmin = function () {
        var username = this.getUsername();
        if (username) {
            var sessionData = this.getSessionData();
            if (sessionData) {
                var tokenData = ht_token_service_1.HT_TokenService.parseJwt(sessionData.accessToken);
                if (tokenData) {
                    var roles = tokenData['role'];
                    if (roles && roles.length > 0 && roles.includes('HT_ADMIN')) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    return HT_DataService;
}());
exports.HT_DataService = HT_DataService;
