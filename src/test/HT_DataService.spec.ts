import { HT_DataService } from '../helpers/ht_data.service';
import HT_LocalStorage from '../storage/ht_local.storage.service';
import HaventecCommon from '@haventec/common-web-sdk';
import HT_SessionStorage from '../storage/ht_session.storage.service';
import { ErrorMessage } from '../model/error';
import { HT_Session_Data } from '../model/htsessiondata';
import { HT_Data } from '../model/htdata';
import { HT_TokenService } from '../helpers/ht_token.service';
import { IHaventecAuthenticateResponseObject } from '../model/haventec.authenticate.response.object';

describe("HT_DataService", function () {
    let localSpy4get: jasmine.Spy;
    let localSpy4getAll: jasmine.Spy;
    let localSpy4set: jasmine.Spy;
    let localSpy4remove: jasmine.Spy;
    let sessionSpy4get: jasmine.Spy;
    let sessionSpy4set: jasmine.Spy;
    let sessionSpy4remove: jasmine.Spy;
    let ht_dataService: HT_DataService;
    let baseTime: Date;

    beforeAll(() => {
        ht_dataService = new HT_DataService("username");
    });

    beforeEach(() => {
        localSpy4set = spyOn(HT_LocalStorage, 'setItem');
        localSpy4remove = spyOn(HT_LocalStorage, 'removeItem');
        localSpy4get = spyOn(HT_LocalStorage, 'getItem');
        localSpy4getAll = spyOn(HT_LocalStorage, 'getAllItems');
        sessionSpy4set = spyOn(HT_SessionStorage, 'setItem');
        sessionSpy4remove = spyOn(HT_SessionStorage, 'removeItem');
        sessionSpy4get = spyOn(HT_SessionStorage, 'getItem');
        jasmine.clock().install();
        baseTime = new Date();
        jasmine.clock().mockDate(baseTime);
    });

    afterEach(() => {
        jasmine.clock().uninstall();
    })

    it("sets username and stores it in localstorage in object creation", function () {
        spyOn(HaventecCommon, 'generateSalt').and.returnValue(111);
        new HT_DataService("username");
        expect(localSpy4get).toHaveBeenCalled();
        expect(localSpy4set).toHaveBeenCalled();
        expect(ht_dataService.getUsername()).toBe("username");
    });

    it("removes haventec_username from the local storage", function () {
        ht_dataService.removeUsername();
        expect(localSpy4remove).toHaveBeenCalled();
    });

    it("removes username and associated data from storage for purge task", function () {
        ht_dataService.purgeUser();
        expect(localSpy4remove).toHaveBeenCalled();
    });

    it("calls the device-info functionality in common-web-sdk", function () {
        let hc_spy = spyOn(HaventecCommon, 'getDeviceInfo');
        ht_dataService.getDeviceInfo();
        expect(hc_spy).toHaveBeenCalled();
    });

    it("removes data from session storage on invalidating token ", function () {
        ht_dataService.invalidateToken();
        expect(sessionSpy4remove).toHaveBeenCalled();
    });

    it("updates the sessionstorage while updating response object", function () {
        ht_dataService.updateStorage(<IHaventecAuthenticateResponseObject>{ "accessToken": { "token": "TOKEN", "type": "TYPE" } });
        expect(sessionSpy4set).toHaveBeenCalled();
        expect(sessionSpy4get).toHaveBeenCalled();
    });

    it("calls and returns value from session storage when accessToken is requested", function () {
        sessionSpy4get.and.returnValue(<HT_Session_Data>{ "accessToken": "XXX" });
        expect(ht_dataService.getAccessToken()).toBe("XXX");
    });

    it("calls and returns active users from local storage", function () {
        let activeUser = { "deviceUuid": "deviceUuid1", "username": "user1@mail.com" };
        localSpy4getAll.and.returnValue({ "ht_user1@mail.com_localdata": activeUser });
        localSpy4get.withArgs("ht_user1@mail.com_localdata").and.returnValue(activeUser);
        expect(ht_dataService.getActiveUsernames()).toEqual(["user1@mail.com"]);
    });

    it("calls and returns an empty list when local storage has no active users", function () {
        let activeUser = { "username": "user1@mail.com" };
        localSpy4getAll.and.returnValue({ "ht_user1@mail.com_localdata": activeUser });
        localSpy4get.withArgs("ht_user1@mail.com_localdata").and.returnValue(activeUser);
        expect(ht_dataService.getActiveUsernames()).toEqual([]);
    });

    it("calls and returns an empty list when local storage is empty", function () {
        localSpy4getAll.and.returnValue({});
        expect(ht_dataService.getActiveUsernames()).toEqual([]);
    });

    it("calls and returns an empty list when local storage contains non-user related data", function () {
        localSpy4getAll.and.returnValue({ "randomKey": { "randomValuey": "randomvalue" } });
        expect(ht_dataService.getActiveUsernames()).toEqual([]);
    });

    it("calls and returns a list of active users from local storage", function () {
        localSpy4get.and.returnValue(<HT_Data>{ "deviceUuid": "XXX" });
        expect(ht_dataService.getDeviceUuid()).toBe("XXX");
    });

    it("calls and returns value from local storage when deviceUuid is requested", function () {
        localSpy4get.and.returnValue(<HT_Data>{ "deviceUuid": "XXX" });
        expect(ht_dataService.getDeviceUuid()).toBe("XXX");
    });

    it("calls and returns value from local storage when authKey is requested", function () {
        localSpy4get.and.returnValue(<HT_Data>{ "authKey": "XXX" });
        expect(ht_dataService.getAuthKey()).toBe("XXX");
    });

    it("calls and returns value from local storage when webAuthnSupported is requested", function () {
        localSpy4get.and.returnValue(<HT_Data>{ "webAuthnSupported": true });
        expect(ht_dataService.getWebAuthnSupported()).toBeTrue();
    });

    it("calls and returns value from local storage when salt is requested", function () {
        localSpy4get.and.returnValue(<HT_Data>{ "saltBits": "XXX" });
        expect(ht_dataService.getSalt()).toBe("XXX");
    });

    it("calls and sets value to local storage when salt is set", function () {
        ht_dataService.setSalt("XXX");
        expect(localSpy4set).toHaveBeenCalled();
    });

    it("calls and sets value to local storage when salt is set", function () {

        localSpy4get.and.returnValue(<HT_Data>{ "saltBits": "XXX" });

        ht_dataService.regenerateSalt();
        const salt1 = ht_dataService.getSalt();

        ht_dataService.regenerateSalt();
        const salt2 = ht_dataService.getSalt();

        expect(salt1 === salt2).toBeFalse();
    });

    it("updates the localstorage while updating response object with authKey only", function () {
        ht_dataService.updateStorage(<IHaventecAuthenticateResponseObject>{ "authKey": "AUTH_KEY" });
        expect(localSpy4get).toHaveBeenCalled();
        expect(localSpy4set).toHaveBeenCalledWith("ht_username_localdata", new HT_Data("username", undefined, undefined, "AUTH_KEY", baseTime, undefined));
    });

    it("updates the localstorage while updating response object with deviceUuid only", function () {
        ht_dataService.updateStorage(<IHaventecAuthenticateResponseObject>{ "deviceUuid": "DEVICE_UUID" });
        expect(localSpy4get).toHaveBeenCalled();
        expect(localSpy4set).toHaveBeenCalledWith("ht_username_localdata", new HT_Data("username", undefined, "DEVICE_UUID", undefined, baseTime, undefined));
    });

    it("updates the localstorage while updating response object with webAuthnSupported = true only", function () {
        ht_dataService.updateStorage(<IHaventecAuthenticateResponseObject>{ "webAuthnSupported": true });
        expect(localSpy4get).toHaveBeenCalled();
        expect(localSpy4set).toHaveBeenCalledWith("ht_username_localdata", new HT_Data("username", undefined, undefined, undefined, baseTime, true));
    });

    it("updates the localstorage while updating response object with webAuthnSupported = false only", function () {
        ht_dataService.updateStorage(<IHaventecAuthenticateResponseObject>{ "webAuthnSupported": false });
        expect(localSpy4get).toHaveBeenCalled();
        expect(localSpy4set).toHaveBeenCalledWith("ht_username_localdata", new HT_Data("username", undefined, undefined, undefined, baseTime, false));
    });

    it("updates the localstorage while updating response object with all possible response values only", function () {
        ht_dataService.updateStorage(<IHaventecAuthenticateResponseObject>{ "authKey": "AUTH_KEY",  "deviceUuid": "DEVICE_UUID", "webAuthnSupported": true });
        expect(localSpy4get).toHaveBeenCalled();
        expect(localSpy4set).toHaveBeenCalledWith("ht_username_localdata", new HT_Data("username", undefined, "DEVICE_UUID", "AUTH_KEY", baseTime, true));
    });

    it("doesn't update the localstorage while updating response object if response is missing keys / values", function () {
        ht_dataService.updateStorage(<IHaventecAuthenticateResponseObject>{ "authKey": undefined,  "deviceUuid": undefined, "webAuthnSupported": undefined });
        expect(localSpy4set).toHaveBeenCalledTimes(1);
        expect(localSpy4set).not.toHaveBeenCalledTimes(2);
    });

    it("doesn't update the localstorage while updating response object if response is empty", function () {
        ht_dataService.updateStorage(<IHaventecAuthenticateResponseObject>{});
        expect(localSpy4set).toHaveBeenCalledTimes(1);
        expect(localSpy4set).not.toHaveBeenCalledTimes(2);
    });
    
    it("throws error if accesstoken is wrong while requesting for application-uuid", function () {
        try {
            ht_dataService.getApplicationUuid();
            fail();
        } catch (e) {
            expect(e.message).toBe(ErrorMessage.PARSING_ERROR);
        }
    });

    it("calls and returns value by parsing accessToken in session storage when applicationUUID is requested", function () {
        spyOn(HT_TokenService, 'parseJwt').and.returnValue({ "applicationUUID": "XXX" });
        try {
            expect(ht_dataService.getApplicationUuid()).toBe("XXX");
        } catch (e) {
            fail();
        }
    });

    it("throws error if accesstoken is wrong while requesting for user-uuid", function () {
        try {
            ht_dataService.getUserUuid();
            fail();
        } catch (e) {
            expect(e.message).toBe(ErrorMessage.PARSING_ERROR);
        }
    });

    it("calls and returns value by parsing accessToken in session storage when user-uuid is requested", function () {
        spyOn(HT_TokenService, 'parseJwt').and.returnValue({ "userUUID": "XXX" });
        try {
            expect(ht_dataService.getUserUuid()).toBe("XXX");
        } catch (e) {
            fail();
        }
    });

    it("throws error if data is not set before calling getHashedPin", function () {
        ht_dataService.purgeUser();

        try {
            ht_dataService.getHashedPin('1234');
            fail();
        } catch (e) {
            expect(e.message).toBe(ErrorMessage.NOT_INITIALISED);
        }
    });

    it("calls getHashedPin with success", function () {
        let activeUser = { "deviceUuid": "deviceUuid1", "username": "username" };
        localSpy4get.withArgs("ht_username_localdata").and.returnValue(activeUser);

        // the other tests blow away the localdata
        ht_dataService = new HT_DataService("username");

        const hc_spy = spyOn(HaventecCommon, 'hashPin');

        ht_dataService.getHashedPin('1234');
        expect(hc_spy).toHaveBeenCalled();
    });
});
