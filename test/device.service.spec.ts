import {expect, tap} from "tapbundle";
import {HT_DeviceService} from "../ts/ht_device.service";

// Test device.service.ts
tap.test("it should test getDeviceName", async () => {

    let deviceService = new HT_DeviceService();

    expect(deviceService.getDeviceName()).to.be.equal('Unknown device');

});

tap.start()