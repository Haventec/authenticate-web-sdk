"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var atob = require("atob");
var HT_TokenService = /** @class */ (function () {
    function HT_TokenService() {
    }
    HT_TokenService.parseJwt = function (jwtToken) {
        if (!jwtToken) {
            return null;
        }
        var base64Url = jwtToken.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        var token = JSON.parse(atob(base64));
        return token;
    };
    ;
    return HT_TokenService;
}());
exports.HT_TokenService = HT_TokenService;
