import HT_SessionStorage from '../storage/ht_session.storage.service';
import { HT_Session_Data } from '../model/htsessiondata';

describe("HT_SessionStorage", function () {
    let storeSpyGet: jasmine.Spy;
    let storeSpySet: jasmine.Spy;
    let storeSpyRemove: jasmine.Spy;

    beforeEach(()=>{
        storeSpyGet = spyOn((<any>HT_SessionStorage).store,'getItem');
        storeSpyRemove = spyOn((<any>HT_SessionStorage).store,'removeItem');
        storeSpySet = spyOn((<any>HT_SessionStorage).store,'setItem');
    });

    it("accesses the session storage if data is not found in map ", function () {
        HT_SessionStorage.getItem("KEY")
        expect(storeSpyGet).toHaveBeenCalled();
    });

    it("does not accesses the session storage if data is not found in map ", function () {
        HT_SessionStorage.setItem("KEY",<HT_Session_Data>{"accessToken":"VALUE"});
        HT_SessionStorage.getItem("KEY")
        expect(storeSpyGet).toHaveBeenCalledTimes(0);
        HT_SessionStorage.removeItem("KEY");
    });

    it("removes data from session storage and the map ", function () {
        HT_SessionStorage.setItem("KEY",<HT_Session_Data>{"accessToken":"VALUE"});
        HT_SessionStorage.removeItem("KEY");
        expect(storeSpyRemove).toHaveBeenCalled();
        HT_SessionStorage.getItem("KEY");
        expect(storeSpyGet).toHaveBeenCalled();
    });

    it("sets data to the session storage and also the map ", function () {
        HT_SessionStorage.setItem("KEY",<HT_Session_Data>{"accessToken":"VALUE"});
        expect(storeSpySet).toHaveBeenCalled();
        HT_SessionStorage.removeItem("KEY");
    });

}); 