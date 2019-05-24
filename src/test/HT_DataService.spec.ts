import {HT_DataService} from '../helpers/ht_data.service';
import HT_LocalStorage from '../storage/ht_local.storage.service';
import HaventecCommon from '@haventec/common-web-sdk';
import HT_SessionStorage from '../storage/ht_session.storage.service';
import { ErrorMessage } from '../model/error';
import { HT_Session_Data } from '../model/htsessiondata';
import { HT_Data } from '../model/htdata';
import {HT_TokenService} from '../helpers/ht_token.service';
import { IHaventecAuthenticateResponseObject } from '../model/haventec.authenticate.response.object';

describe("HT_DataService", function () {
    let localSpy4get: jasmine.Spy;
    let localSpy4getAll: jasmine.Spy;
    let localSpy4set: jasmine.Spy;
    let localSpy4remove: jasmine.Spy;
    let sessionSpy4get: jasmine.Spy;
    let sessionSpy4set: jasmine.Spy;
    let sessionSpy4remove: jasmine.Spy;
    let ht_dataServcie: HT_DataService;

    beforeAll(() => {
        ht_dataServcie = new HT_DataService("username");
    })
    

    beforeEach(() => {
        localSpy4set =  spyOn(HT_LocalStorage, 'setItem');
        localSpy4remove =  spyOn(HT_LocalStorage,'removeItem');
        localSpy4get =  spyOn(HT_LocalStorage, 'getItem');
        localSpy4getAll =  spyOn(HT_LocalStorage, 'getAllItems');
        sessionSpy4set =  spyOn(HT_SessionStorage, 'setItem');
        sessionSpy4remove =  spyOn(HT_SessionStorage,'removeItem');
        sessionSpy4get =  spyOn(HT_SessionStorage, 'getItem');
    });

    it("sets username and stores it in localstorage in object creation", function () {
        spyOn(HaventecCommon, 'generateSalt').and.returnValue(111);
        new HT_DataService("username");
        expect(localSpy4get).toHaveBeenCalled();
        expect(localSpy4set).toHaveBeenCalled();
        expect(ht_dataServcie.getUsername()).toBe("username");
    });

    it("removes haventec_username from the local storage", function () {
        ht_dataServcie.removeUsername();
        expect(localSpy4remove).toHaveBeenCalled();
    });

    it("removes username and associated data from storage for purge task", function () {
        ht_dataServcie.purgeUser();
        expect(localSpy4remove).toHaveBeenCalled();
    });

    it("calls the device-info functionality in common-web-sdk", function () {
        let hc_spy = spyOn(HaventecCommon, 'getDeviceInfo');
        ht_dataServcie.getDeviceInfo();
        expect(hc_spy).toHaveBeenCalled();
    });

    it("removes data from session storage on invalidating token ", function () {
        ht_dataServcie.invalidateToken();
        expect(sessionSpy4remove).toHaveBeenCalled();
    });

    it("updates the sessionstorage while updating resposne object", function () {
        ht_dataServcie.updateStorage(<IHaventecAuthenticateResponseObject>{"accessToken": {"token":"TOKEN","type":"TYPE"}});
        expect(sessionSpy4set).toHaveBeenCalled();
        expect(sessionSpy4get).toHaveBeenCalled();
    });

    it("calls and returns value from session storage when accessToken is requested", function () {
        sessionSpy4get.and.returnValue(<HT_Session_Data>{"accessToken": "XXX"})
        expect(ht_dataServcie.getAccessToken()).toBe("XXX");
    });

    it("calls and returns active users from local storage", function () {
        let activeUser = {"deviceUuid": "deviceUuid1", "username": "user1@mail.com"};
        localSpy4getAll.and.returnValue({"ht_user1@mail.com_localdata": activeUser});
        localSpy4get.withArgs("ht_user1@mail.com_localdata").and.returnValue(activeUser)
        expect(ht_dataServcie.getActiveUsernames()).toEqual(["user1@mail.com"]);
    });

    it("calls and returns an empty list when local storage has no active users", function () {
        let activeUser = {"username": "user1@mail.com"};
        localSpy4getAll.and.returnValue({"ht_user1@mail.com_localdata": activeUser});
        localSpy4get.withArgs("ht_user1@mail.com_localdata").and.returnValue(activeUser)
        expect(ht_dataServcie.getActiveUsernames()).toEqual([]);
    });

    it("calls and returns a list of active users from local storage", function () {
        localSpy4get.and.returnValue(<HT_Data>{"deviceUuid":"XXX"})
        expect(ht_dataServcie.getDeviceUuid()).toBe("XXX");
    });

    it("calls and returns value from local storage when deviceUuid is requested", function () {
        localSpy4get.and.returnValue(<HT_Data>{"deviceUuid":"XXX"})
        expect(ht_dataServcie.getDeviceUuid()).toBe("XXX");
    });

    it("calls and returns value from local storage when authKey is requested", function () {
        localSpy4get.and.returnValue(<HT_Data>{"authKey":"XXX"})
        expect(ht_dataServcie.getAuthKey()).toBe("XXX");
    });
    
    it("throws error if accesstoken is worng while requesting for application-uuid", function () {
        try{
            ht_dataServcie.getApplicationUuid();
            fail();
        } catch(e){
            expect(e.message).toBe(ErrorMessage.PARSING_ERROR);
        }
    });

    it("calls and returns value by parsing accessToken in session storage when applicationUUID is requested", function () {
        spyOn(HT_TokenService, 'parseJwt').and.returnValue({"applicationUUID":"XXX"})
        try{
            expect(ht_dataServcie.getApplicationUuid()).toBe("XXX");
        } catch(e){
            fail();
        }    
    });

    it("throws error if accesstoken is worng while requesting for user-uuid", function () {
        try{
            ht_dataServcie.getUserUuid();
            fail();
        } catch(e){
            expect(e.message).toBe(ErrorMessage.PARSING_ERROR);
        }
    });

    it("calls and returns value by parsing accessToken in session storage when user-uuid is requested", function () {
        spyOn(HT_TokenService, 'parseJwt').and.returnValue({"userUUID":"XXX"})
        try{
            expect(ht_dataServcie.getUserUuid()).toBe("XXX");
        } catch(e){
            fail();
        }    
    });

}); 
