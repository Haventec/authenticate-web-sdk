import { HaventecAuthenticate } from "../api/haventec.authenticate";
import { Error } from "../model/error";
import { HT_DataService } from '../helpers/ht_data.service';
import HT_LocalStorage from '../storage/ht_local.storage.service';
import HaventecCommon from '@haventec/common-web-sdk/';
import HT_SessionStorage from '../storage/ht_session.storage.service';
import { HT_Session_Data } from '../model/htsessiondata';
import { HT_Data } from '../model/htdata';
import { HT_TokenService } from '../helpers/ht_token.service';
import { ISessionUpdateRequestObject } from "../model/session.update.request.object";

describe("HT_Authenticate", function () {

    let haventecAuthenticate: HaventecAuthenticate;

    beforeAll(() => {
        haventecAuthenticate = new HaventecAuthenticate("username");
        spyOn(HT_LocalStorage, 'setItem');
        spyOn(HT_LocalStorage, 'removeItem');
        spyOn(HT_LocalStorage, 'getItem');
        spyOn(HT_SessionStorage, 'setItem');
        spyOn(HT_SessionStorage, 'removeItem');
        spyOn(HT_SessionStorage, 'getItem');
    });

    it("throws error if user tries to create an object with undefined/null value for username", function () {
        try {
            new HaventecAuthenticate(undefined);
            fail();
        } catch (e) {
            expect(e).toBe(Error.INSUFFICIENT_PARAMETERS);
        }
    });

    

    it("calls the associated function in dataservice if updatestorage is called", function () {
        try {
            let spy = spyOn((<any>haventecAuthenticate).ht_dataService, 'updateSessionStorage');
            haventecAuthenticate.updateStorage(<ISessionUpdateRequestObject>{"authKey":"AUTH_KEY"});
            expect(spy).toHaveBeenCalled();
        } catch (e) {
            fail();
        }
    });


    it("throws error if updateStorage is called with invalid params", function () {
        try {
            haventecAuthenticate.updateStorage(undefined);
        } catch (e) {
            expect(e).toBe(Error.INVALID_OBJECT);
        }
    });

    it("throws error if updateStorage is called with invalid params", function () {
        try {
            haventecAuthenticate.updateStorage(<any>{});
        } catch (e) {
            expect(e).toBe(Error.INVALID_OBJECT);
        }
    });


    it("calls the associated function in dataservice if hashpin is called with required parameters", function () {
        try {
            let spy = spyOn((<any>haventecAuthenticate).ht_dataService, 'getHashedPin');
            haventecAuthenticate.hashPin("PIN", 1111);
            expect(spy).toHaveBeenCalled();
        } catch (e) {
            fail();
        }
    });

    it("throws error if hashpin is called without required parameters", function () {
        try {
            haventecAuthenticate.hashPin(undefined, undefined);
            fail();
        } catch (e) {
            expect(e).toBe(Error.INSUFFICIENT_PARAMETERS);
        }
    });

    it("calls the associated function in dataservice and gets devicename is appropriate format", function () {
        try {
            let spy = spyOn(haventecAuthenticate, 'getDeviceInfo').and.returnValue({ "osType": "MacOS", "browserType": "Chromium" });
            expect(haventecAuthenticate.getDeviceName()).toBe("MacOS+Chromium");
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