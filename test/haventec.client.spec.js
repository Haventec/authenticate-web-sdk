"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tapbundle_1 = require("tapbundle");
var haventec_client_1 = require("../ts/api/haventec.client");
tapbundle_1.tap.test("it should test HaventecAuthenticateClient API", function () { return __awaiter(_this, void 0, void 0, function () {
    var haventecAuthenticateClient, fakeResponse, fakeResponseNonAdmin, fakeResponseAdmin, hashedPin;
    return __generator(this, function (_a) {
        haventecAuthenticateClient = new haventec_client_1.HaventecAuthenticateClient(true);
        fakeResponse = {
            "applicationUuid": "7472a4c0-7e7a-4d4e-908c-7f91af169f67",
            "username": "testusername",
            "deviceUuid": "b42713aa-ee1d-489e-9fb6-3621140dcc35",
            "authKey": "Mwpb0QDijruk/9Wv9BRe2jAd5aXbgJ/EJ+eNpfpQXirAsJm/GK7WzOV25uOlabH9FFhPBEIB4yLWqc4l0e2h13rjzzxXJf4cUW+7c7D5H2LInLdIFl2gnxONgnsYB6ENvyHMDeQqAgXNdk07l88Eyh+4eKqLgSpAB12/LXjST+/2JL+7Uc2jRK2vBwyp21G0fvasC8vanw6FwYZp8RXkFEsrfWq3yib8Vr1duRZciB8qZbvsagI1DhF6uI+xPoNDogFE6DlJG6aK85ktz+uFPdZGk6EgfyDzikKIm/51lUf/5aR+TJSZm8IFOk37ydMoly9Z6aqd5r2QHmmnoGAWt/cFiomalsAXYJvgUb3NlhmrSqVD393rlTvc5fPpcssgQPLteeIcTz6FweiHyBOglC2wK2RjDfYwvTfoP3OHnFbQfS1DM7BUu9pXn3bvjYWl1wlWQlWJrn4/DpvQnrP+kg==",
            "accessToken": {
                "token": "eyJhbGciOiJFUzM4NCJ9.eyJpc3MiOiJIYXZlbnRlYyIsImV4cCI6MTUwMDQ2MzU1NCwiaWF0IjoxNTAwNDU5OTU0LCJuYmYiOjE1MDA0NTk4MzQsInN1YiI6IlpldXMiLCJyb2xlIjpbIkhUX0FETUlOIl0sImFwcGxpY2F0aW9uVVVJRCI6Ijc0NzJhNGMwLTdlN2EtNGQ0ZS05MDhjLTdmOTFhZjE2OWY2NyIsInVzZXJVVUlEIjoiNDVkZDIxMzUtOTkxNy00NzIzLTk4NjctYWM3ZWExNTUzMTMzIiwianRpIjoiXzZXRVZJTmdPbG92VUtvbmZuOVhhdyJ9.06GeGkXYuDOCB7A36QnFr0vTNCXZ2RBQV0Sdp-KnwhhZWeJpGqa0aNk_7dqOEZaOX2fQ37zUZLcSumIrOfKMxHYZmEhDDmPFGcpgU8UXaSrk3DKP-jJR975jml_zFNcD",
                "type": "JWT"
            },
            "deviceName": "My Device",
            "status": "SUCCESS",
            "result": "Changed"
        };
        fakeResponseNonAdmin = {
            "applicationUuid": "7472a4c0-7e7a-4d4e-908c-7f91af169f67",
            "username": "testusername",
            "deviceUuid": "b42713aa-ee1d-489e-9fb6-3621140dcc35",
            "authKey": "Mwpb0QDijruk/9Wv9BRe2jAd5aXbgJ/EJ+eNpfpQXirAsJm/GK7WzOV25uOlabH9FFhPBEIB4yLWqc4l0e2h13rjzzxXJf4cUW+7c7D5H2LInLdIFl2gnxONgnsYB6ENvyHMDeQqAgXNdk07l88Eyh+4eKqLgSpAB12/LXjST+/2JL+7Uc2jRK2vBwyp21G0fvasC8vanw6FwYZp8RXkFEsrfWq3yib8Vr1duRZciB8qZbvsagI1DhF6uI+xPoNDogFE6DlJG6aK85ktz+uFPdZGk6EgfyDzikKIm/51lUf/5aR+TJSZm8IFOk37ydMoly9Z6aqd5r2QHmmnoGAWt/cFiomalsAXYJvgUb3NlhmrSqVD393rlTvc5fPpcssgQPLteeIcTz6FweiHyBOglC2wK2RjDfYwvTfoP3OHnFbQfS1DM7BUu9pXn3bvjYWl1wlWQlWJrn4/DpvQnrP+kg==",
            "accessToken": {
                "token": "eyJhbGciOiJFUzM4NCJ9.eyJpc3MiOiJIYXZlbnRlYyIsImV4cCI6MTUwMjM1NDA1OSwiaWF0IjoxNTAyMzUwNDU5LCJuYmYiOjE1MDIzNTAzMzksInN1YiI6InFxcSIsInJvbGUiOlsiSFRfQU5fQURNSU4iLCJIVF9BTl9BVURJVCJdLCJhcHBsaWNhdGlvblVVSUQiOiI1YmQ0YzExNC04ODljLTQ2MTUtYTJlOC1jYmYyOWEzYTk4N2YiLCJ1c2VyVVVJRCI6IjEwZmM0MDZlLTc4NTMtNDg0Ni04MjQ5LWUyMWM5M2ZmYTM3MCIsImp0aSI6Imd0ckR6dzY2UG1aYVpfTUdEU1NuVkEifQ.JDIvhgMBGejwMQkMTZfrhRqtqWSU46oXpDL6PmMrxOOFlsBx3QjGAZlvBNSmwxF9imyFd0Z-WxUrOycsq8Yfr1XyDjW2dHOFSaFWeiuZz-kQ4K4u92QZPZaimYKwneER",
                "type": "JWT"
            },
            "deviceName": "My Device",
            "status": "SUCCESS",
            "result": "Changed"
        };
        fakeResponseAdmin = {
            "applicationUuid": "7472a4c0-7e7a-4d4e-908c-7f91af169f67",
            "username": "testusername",
            "deviceUuid": "b42713aa-ee1d-489e-9fb6-3621140dcc35",
            "authKey": "Mwpb0QDijruk/9Wv9BRe2jAd5aXbgJ/EJ+eNpfpQXirAsJm/GK7WzOV25uOlabH9FFhPBEIB4yLWqc4l0e2h13rjzzxXJf4cUW+7c7D5H2LInLdIFl2gnxONgnsYB6ENvyHMDeQqAgXNdk07l88Eyh+4eKqLgSpAB12/LXjST+/2JL+7Uc2jRK2vBwyp21G0fvasC8vanw6FwYZp8RXkFEsrfWq3yib8Vr1duRZciB8qZbvsagI1DhF6uI+xPoNDogFE6DlJG6aK85ktz+uFPdZGk6EgfyDzikKIm/51lUf/5aR+TJSZm8IFOk37ydMoly9Z6aqd5r2QHmmnoGAWt/cFiomalsAXYJvgUb3NlhmrSqVD393rlTvc5fPpcssgQPLteeIcTz6FweiHyBOglC2wK2RjDfYwvTfoP3OHnFbQfS1DM7BUu9pXn3bvjYWl1wlWQlWJrn4/DpvQnrP+kg==",
            "accessToken": {
                "token": "eyJhbGciOiJFUzM4NCJ9.eyJpc3MiOiJIYXZlbnRlYyIsImV4cCI6MTUwMjM1MTc1MiwiaWF0IjoxNTAyMzQ4MTUyLCJuYmYiOjE1MDIzNDgwMzIsInN1YiI6Imp1c3RpbiIsInJvbGUiOlsiSFRfQURNSU4iXSwiYXBwbGljYXRpb25VVUlEIjoiNWJkNGMxMTQtODg5Yy00NjE1LWEyZTgtY2JmMjlhM2E5ODdmIiwidXNlclVVSUQiOiJmYzljYWEwNy0zNTI3LTQ4NTEtOGQyMS0yNWUxNzYxNWZjZjIiLCJqdGkiOiIwMkpzSW1zdWNBekFZRFJRdXNtbElRIn0.zt_lQ6m0v0t9CUoIne-Glm7NcIhXhzLQuInAS_fbemnYVsm5xtkyfV92DRLpO2l3hyeEngBMQ0M1qxJaBhPv_zso29S5TFDvCXBTrqVgqCw5PDlG1_oRSZyQcW_n5MpW",
                "type": "JWT"
            },
            "deviceName": "My Device",
            "status": "SUCCESS",
            "result": "Changed"
        };
        haventecAuthenticateClient.purge();
        tapbundle_1.expect(haventecAuthenticateClient.getUserUuid()).to.be.equal(undefined);
        tapbundle_1.expect(haventecAuthenticateClient.getApplicationUuid()).to.be.equal(undefined);
        haventecAuthenticateClient.initialize('domain', 'applicationUuid');
        tapbundle_1.expect(haventecAuthenticateClient.getUserUuid()).to.be.equal(undefined);
        tapbundle_1.expect(haventecAuthenticateClient.getApplicationUuid()).to.be.equal(undefined);
        tapbundle_1.expect(haventecAuthenticateClient.getUsername()).to.be.undefined;
        haventecAuthenticateClient.signUp('testusername', 'test@haventec.com');
        haventecAuthenticateClient.updateDataFromResponse(fakeResponse);
        tapbundle_1.expect(haventecAuthenticateClient.getUsername()).to.be.equal('testusername');
        tapbundle_1.expect(haventecAuthenticateClient.getAccessToken()).to.be.equal('eyJhbGciOiJFUzM4NCJ9.eyJpc3MiOiJIYXZlbnRlYyIsImV4cCI6MTUwMDQ2MzU1NCwiaWF0IjoxNTAwNDU5OTU0LCJuYmYiOjE1MDA0NTk4MzQsInN1YiI6IlpldXMiLCJyb2xlIjpbIkhUX0FETUlOIl0sImFwcGxpY2F0aW9uVVVJRCI6Ijc0NzJhNGMwLTdlN2EtNGQ0ZS05MDhjLTdmOTFhZjE2OWY2NyIsInVzZXJVVUlEIjoiNDVkZDIxMzUtOTkxNy00NzIzLTk4NjctYWM3ZWExNTUzMTMzIiwianRpIjoiXzZXRVZJTmdPbG92VUtvbmZuOVhhdyJ9.06GeGkXYuDOCB7A36QnFr0vTNCXZ2RBQV0Sdp-KnwhhZWeJpGqa0aNk_7dqOEZaOX2fQ37zUZLcSumIrOfKMxHYZmEhDDmPFGcpgU8UXaSrk3DKP-jJR975jml_zFNcD');
        tapbundle_1.expect(haventecAuthenticateClient.getDeviceUuid()).to.be.equal('b42713aa-ee1d-489e-9fb6-3621140dcc35');
        tapbundle_1.expect(haventecAuthenticateClient.getAuthKey()).to.be.equal('Mwpb0QDijruk/9Wv9BRe2jAd5aXbgJ/EJ+eNpfpQXirAsJm/GK7WzOV25uOlabH9FFhPBEIB4yLWqc4l0e2h13rjzzxXJf4cUW+7c7D5H2LInLdIFl2gnxONgnsYB6ENvyHMDeQqAgXNdk07l88Eyh+4eKqLgSpAB12/LXjST+/2JL+7Uc2jRK2vBwyp21G0fvasC8vanw6FwYZp8RXkFEsrfWq3yib8Vr1duRZciB8qZbvsagI1DhF6uI+xPoNDogFE6DlJG6aK85ktz+uFPdZGk6EgfyDzikKIm/51lUf/5aR+TJSZm8IFOk37ydMoly9Z6aqd5r2QHmmnoGAWt/cFiomalsAXYJvgUb3NlhmrSqVD393rlTvc5fPpcssgQPLteeIcTz6FweiHyBOglC2wK2RjDfYwvTfoP3OHnFbQfS1DM7BUu9pXn3bvjYWl1wlWQlWJrn4/DpvQnrP+kg==');
        hashedPin = haventecAuthenticateClient.getHashPin('1234');
        // expect(hashedPin).to.be.a("string");
        tapbundle_1.expect(haventecAuthenticateClient.isAdmin()).to.be.true;
        tapbundle_1.expect(haventecAuthenticateClient.getUserUuid()).to.equal("45dd2135-9917-4723-9867-ac7ea1553133");
        tapbundle_1.expect(haventecAuthenticateClient.getApplicationUuid()).to.equal("7472a4c0-7e7a-4d4e-908c-7f91af169f67");
        haventecAuthenticateClient.invalidateToken();
        tapbundle_1.expect(haventecAuthenticateClient.getUserUuid()).to.be.equal(undefined);
        tapbundle_1.expect(haventecAuthenticateClient.getApplicationUuid()).to.equal("7472a4c0-7e7a-4d4e-908c-7f91af169f67");
        haventecAuthenticateClient.purge();
        tapbundle_1.expect(haventecAuthenticateClient.getUserUuid()).to.be.equal(undefined);
        tapbundle_1.expect(haventecAuthenticateClient.getApplicationUuid()).to.be.equal(undefined);
        tapbundle_1.expect(haventecAuthenticateClient.getUsername()).to.be.undefined;
        tapbundle_1.expect(haventecAuthenticateClient.getAccessToken()).to.be.null;
        tapbundle_1.expect(haventecAuthenticateClient.isAdmin()).to.be.false;
        haventecAuthenticateClient.initialize('domain', 'applicationUuid');
        haventecAuthenticateClient.updateDataFromResponse(fakeResponseNonAdmin);
        tapbundle_1.expect(haventecAuthenticateClient.isAdmin()).to.be.false;
        haventecAuthenticateClient.updateDataFromResponse(fakeResponseAdmin);
        tapbundle_1.expect(haventecAuthenticateClient.isAdmin()).to.be.true;
        return [2 /*return*/];
    });
}); });
tapbundle_1.tap.start();
