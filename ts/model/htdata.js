"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HT_Data = /** @class */ (function () {
    function HT_Data(username, pinHash, saltBits, connectorName, connectorUuid, applicationUuid, userUuid, deviceUuid, authKey, publicKey, dataTime) {
        this.username = username;
        this.pinHash = pinHash;
        this.saltBits = saltBits;
        this.connectorName = connectorName;
        this.connectorUuid = connectorUuid;
        this.applicationUuid = applicationUuid;
        this.userUuid = userUuid;
        this.deviceUuid = deviceUuid;
        this.authKey = authKey;
        this.publicKey = publicKey;
        this.dataTime = dataTime;
    }
    return HT_Data;
}());
exports.HT_Data = HT_Data;
