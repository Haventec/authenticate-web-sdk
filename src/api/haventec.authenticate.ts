import { HT_DataService } from "../helpers/ht_data.service";
import { HT_Error, ErrorCode, ErrorMessage } from "../model/error";
import { IHaventecAuthenticateResponseObject } from "../model/haventec.authenticate.response.object";

export class HaventecAuthenticate {

    private ht_dataService: HT_DataService;

    constructor(username: string) {
        if (!username) throw  new HT_Error(ErrorCode.HT_AN_PARAM_ERROR, ErrorMessage.INSUFFICIENT_PARAMETERS);
        this.ht_dataService = new HT_DataService(username);
    }

    public updateStorage(requestObject: IHaventecAuthenticateResponseObject): void {
        if (!requestObject) throw new HT_Error(ErrorCode.HT_AN_PARAM_ERROR, ErrorMessage.INVALID_OBJECT);
        if(typeof requestObject !== 'object') throw new HT_Error(ErrorCode.HT_AN_PARAM_ERROR, ErrorMessage.INVALID_OBJECT);
        if (Object.keys(requestObject).length < 1) throw new HT_Error(ErrorCode.HT_AN_PARAM_ERROR, ErrorMessage.INVALID_OBJECT);
        this.ht_dataService.updateStorage(requestObject);
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

    public hashPin(pin: string): string {
        if (!pin) throw new HT_Error(ErrorCode.HT_AN_PARAM_ERROR, ErrorMessage.INSUFFICIENT_PARAMETERS);
        return this.ht_dataService.getHashedPin(pin);
    }

    public getDeviceInfo(detailedFingerprint = false): Object {
        return this.ht_dataService.getDeviceInfo(detailedFingerprint);
    }
}
