import HT_LocalStorage from '../storage/ht_local.storage.service';

describe("HT_DeviceInfoService", function () {
    let storeSpyGet: jasmine.Spy;
    let storeSpySet: jasmine.Spy;
    let storeSpyRemove: jasmine.Spy;

    beforeEach(()=>{
        storeSpyGet = spyOn((<any>HT_LocalStorage).store,'getItem');
        storeSpyRemove = spyOn((<any>HT_LocalStorage).store,'removeItem');
        storeSpySet = spyOn((<any>HT_LocalStorage).store,'setItem');
    });

    it("accesses the local storage if data is not found in map ", function () {
        HT_LocalStorage.getItem("KEY")
        expect(storeSpyGet).toHaveBeenCalled();
    });

    it("does not accesses the local storage if data is not found in map ", function () {
        HT_LocalStorage.setItem("KEY","VALUE");
        HT_LocalStorage.getItem("KEY")
        expect(storeSpyGet).toHaveBeenCalledTimes(0);
        HT_LocalStorage.removeItem("KEY");
    });

    it("removes data from local storage and the map ", function () {
        HT_LocalStorage.setItem("KEY","VALUE");
        HT_LocalStorage.removeItem("KEY");
        expect(storeSpyRemove).toHaveBeenCalled();
        HT_LocalStorage.getItem("KEY");
        expect(storeSpyGet).toHaveBeenCalled();
    });

    it("sets data to the local storage and also the map ", function () {
        HT_LocalStorage.setItem("KEY","VALUE");
        expect(storeSpySet).toHaveBeenCalled();;
    });

}); 