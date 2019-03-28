import { HT_DataService } from "../helpers/ht_data.service";
import { Error } from "../model/error";
import { ISessionUpdateRequestObject } from "../model/session.update.request.object";

export class HaventecAuthenticate {

    private ht_dataService: HT_DataService;

    constructor(username: string) {
        if (!username) throw Error.INSUFFICIENT_PARAMETERS;
        this.ht_dataService = new HT_DataService(username.toLowerCase());
    }

    public updateStorage(requestObject: ISessionUpdateRequestObject): void {
        if (!requestObject) throw Error.INVALID_OBJECT;
        if (Object.keys(requestObject).length < 1) throw Error.INVALID_OBJECT;
        this.ht_dataService.updateSessionStorage(requestObject);
    }

    public getDeviceName(): string {
        let deviceInfo = this.getDeviceInfo();
        return deviceInfo['osType'] + "+" + deviceInfo['browserType']
    }

    public clearAccessToken(): void {
        this.ht_dataService.invalidateToken();
    }

    public getAccessToken(): string {
        return this.ht_dataService.getAccessToken();
    }

    public getUsername(): string {
        return this.ht_dataService.getUsername();
    }

    public getDeviceUuid(): string {
        return this.ht_dataService.getDeviceUuid();
    }

    public getUserUuid(): string {
        return this.ht_dataService.getUserUuid();
    }

    public getAuthKey(): string {
        return this.ht_dataService.getAuthKey();
    }

    public clearUserStorage(): void {
        this.ht_dataService.purgeUser();
    }

    public hashPin(pin: string, salt: Array<number>[128]): string {
        if (!pin) throw Error.INSUFFICIENT_PARAMETERS;
        return this.ht_dataService.getHashedPin(pin, salt);
    }

    public getDeviceInfo(): Object {
        return this.ht_dataService.getDeviceInfo();
    }
}
