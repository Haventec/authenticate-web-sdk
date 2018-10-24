import {expect, tap} from "tapbundle";
import {HT_StorageService} from "../ts/storage/ht_storage.service";
import {isUndefined} from "util";

tap.test("it should test TransientLocalService", async () => {

    let ls = new HT_StorageService(true);

    ls.setItem('test1', 'mytest1');

    let itm = ls.getItem('test1');
    expect(itm).to.be.equal('mytest1');

    ls.removeItem('test1');

    itm = ls.getItem('test1');
    expect(itm).to.be.undefined;

});

tap.test("it should test LocalService - errors because not being run in browser", async () => {

    let has_error = false;
    try {
        let ls = new HT_StorageService();
    } catch ( error ) {
        console.log(error);
        has_error = true;
    }

    expect(has_error).to.be.true;
});

tap.start()