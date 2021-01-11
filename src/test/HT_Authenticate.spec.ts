import { HaventecAuthenticate } from "../api/haventec.authenticate";
import { ErrorMessage, HT_Error } from "../model/error";
import HT_LocalStorage from '../storage/ht_local.storage.service';
import HT_SessionStorage from '../storage/ht_session.storage.service';
import { IHaventecAuthenticateResponseObject } from "../model/haventec.authenticate.response.object";

describe("HT_Authenticate", function () {

    let haventecAuthenticate: HaventecAuthenticate = new HaventecAuthenticate("username");

    beforeAll(() => {
        haventecAuthenticate.initialiseStorage("username");
        spyOn(HT_LocalStorage, 'setItem');
        spyOn(HT_LocalStorage, 'removeItem');
        spyOn(HT_LocalStorage, 'getItem');
        spyOn(HT_LocalStorage, 'getAllItems');
        spyOn(HT_SessionStorage, 'setItem');
        spyOn(HT_SessionStorage, 'removeItem');
        spyOn(HT_SessionStorage, 'getItem');
    });

    it("calls getAccessToken() without initialisation to ensure this is valid but returns undefined", function () {
        const haventecAuthenticate2: HaventecAuthenticate = new HaventecAuthenticate();
        expect(haventecAuthenticate2.getAccessToken()).toBeUndefined();
    });

    it("throws error if user tries to create an object with undefined/null value for username", function () {
        try {
            haventecAuthenticate.initialiseStorage(undefined);
            fail();
        } catch (e) {
            expect(e.message).toBe(ErrorMessage.INSUFFICIENT_PARAMETERS);
        }
    });



    it("calls the associated function in dataservice if updatestorage is called", function () {
        try {
            let spy = spyOn((<any>haventecAuthenticate).ht_dataService, 'updateStorage');
            haventecAuthenticate.updateStorage(<IHaventecAuthenticateResponseObject>{"authKey":"AUTH_KEY"});
            expect(spy).toHaveBeenCalled();
        } catch (e) {
            fail();
        }
    });


    it("throws error if updateStorage is called with invalid params", function () {
        try {
            haventecAuthenticate.updateStorage(undefined);
        } catch (e) {
            expect(e.message).toBe(ErrorMessage.INVALID_OBJECT);
        }
    });

    it("throws error if updateStorage is called with invalid params", function () {
        try {
            haventecAuthenticate.updateStorage(<any>{});
        } catch (e) {
            expect(e.message).toBe(ErrorMessage.INVALID_OBJECT);
        }
    });


    it("calls the associated function in dataservice if hashpin is called with required parameters", function () {
        try {
            let spy = spyOn((<any>haventecAuthenticate).ht_dataService, 'getHashedPin');
            haventecAuthenticate.hashPin("PIN");
            expect(spy).toHaveBeenCalled();
        } catch (e) {
            fail();
        }
    });

    it("throws error if hashpin is called without required parameters", function () {
        try {
            haventecAuthenticate.hashPin(undefined);
            fail();
        } catch (e) {
            expect(e.message).toBe(ErrorMessage.INSUFFICIENT_PARAMETERS);
        }
    });

    it("calls the associated function in dataservice and gets devicename is appropriate format", function () {
        try {
            let spy = spyOn(haventecAuthenticate, 'getDeviceInfo').and.returnValue({
                params: [
                    {key: "osType", value: "MacOS"},
                    {key: "browserType", value: "Chromium"}
                ]
            });
            expect(haventecAuthenticate.getDeviceName()).toBe("MacOS+Chromium");
            expect(spy).toHaveBeenCalled();
        } catch (e) {
            fail();
        }
    });

    it("calls the associated function in dataservice and gets devicename is appropriate format - osType and browserType params missing", function () {
        try {
            let spy = spyOn(haventecAuthenticate, 'getDeviceInfo').and.returnValue({
                params: [
                    {key: "os-type", value: "MacOS"},
                    {key: "browser-type", value: "Chromium"}
                ]
            });
            expect(haventecAuthenticate.getDeviceName()).toBe("Generic Device");
            expect(spy).toHaveBeenCalled();
        } catch (e) {
            fail();
        }
    });

    it("calls the associated function in dataservice and gets devicename is appropriate format - with no deviceInfo", function () {
        try {
            let spy = spyOn(haventecAuthenticate, 'getDeviceInfo').and.returnValue(null);
            expect(haventecAuthenticate.getDeviceName()).toBe("Generic Device");
            expect(spy).toHaveBeenCalled();
        } catch (e) {
            fail();
        }
    });

    it("calls the associated function in dataservice and returns correct usernames", function () {
        try {
            let spy = spyOn((<any>haventecAuthenticate).ht_dataService, 'getActiveUsernames').and.returnValue(["user1@mail.com", "user2@mail.com"]);
            expect(haventecAuthenticate.getActiveUsernames()).toEqual(["user1@mail.com", "user2@mail.com"]);
            expect(spy).toHaveBeenCalled();
        } catch (e) {
            fail();
        }
    });

    it("calls the associated function in dataservice for any call to clear access token", function () {
        let spy = spyOn((<any>haventecAuthenticate).ht_dataService, 'invalidateToken');
        haventecAuthenticate.clearAccessToken();
        expect(spy).toHaveBeenCalled();
    });

    it("calls the associated function in dataservice for any call to get access token", function () {
        let spy = spyOn((<any>haventecAuthenticate).ht_dataService, 'getAccessToken');
        haventecAuthenticate.getAccessToken();
        expect(spy).toHaveBeenCalled();
    });


    it("calls the associated function in dataservice for any call to get username", function () {
        let spy = spyOn((<any>haventecAuthenticate).ht_dataService, 'getUsername');
        haventecAuthenticate.getUsername();
        expect(spy).toHaveBeenCalled();
    });


    it("calls the associated function in dataservice for any call to get deviceuuid", function () {
        let spy = spyOn((<any>haventecAuthenticate).ht_dataService, 'getDeviceUuid');
        haventecAuthenticate.getDeviceUuid();
        expect(spy).toHaveBeenCalled();
    });

    it("calls the associated function in dataservice for any call to get user-uuid", function () {
        let spy = spyOn((<any>haventecAuthenticate).ht_dataService, 'getUserUuid');
        haventecAuthenticate.getUserUuid();
        expect(spy).toHaveBeenCalled();
    });

    it("calls the associated function in dataservice for any call to get auth key", function () {
        let spy = spyOn((<any>haventecAuthenticate).ht_dataService, 'getAuthKey');
        haventecAuthenticate.getAuthKey();
        expect(spy).toHaveBeenCalled();
    });

    it("calls the associated function in dataservice for any call to get webAuthnSupported", function () {
        let spy = spyOn((<any>haventecAuthenticate).ht_dataService, 'getWebAuthnSupported');
        haventecAuthenticate.getWebAuthnSupported();
        expect(spy).toHaveBeenCalled();
    });

    it("calls the associated function in dataservice for any call to get salt", function () {
        let spy = spyOn((<any>haventecAuthenticate).ht_dataService, 'getSalt');
        haventecAuthenticate.getSalt();
        expect(spy).toHaveBeenCalled();
    });

    it("calls the associated function in dataservice for any call to set salt", function () {
        let spy = spyOn((<any>haventecAuthenticate).ht_dataService, 'setSalt');
        haventecAuthenticate.setSalt('test salt');
        expect(spy).toHaveBeenCalled();
    });

    it("calls regenerateSalt to generate a new salt value", function () {
        let spy = spyOn((<any>haventecAuthenticate).ht_dataService, 'regenerateSalt');
        haventecAuthenticate.regenerateSalt();
        expect(spy).toHaveBeenCalled();
    });

    it("calls the associated function in dataservice for any call to clear user storage", function () {
        let spy = spyOn((<any>haventecAuthenticate).ht_dataService, 'purgeUser');
        haventecAuthenticate.clearUserStorage();
        expect(spy).toHaveBeenCalled();
    });

    it("calls the associated function in dataservice for any call to get device info", function () {
        let spy = spyOn((<any>haventecAuthenticate).ht_dataService, 'getDeviceInfo');
        haventecAuthenticate.getDeviceInfo();
        expect(spy).toHaveBeenCalled();
    });




}); 
