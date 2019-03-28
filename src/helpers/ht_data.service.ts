import { HT_Data } from '../model/htdata';
import { HT_TokenService } from "./ht_token.service";
import { HT_Session_Data } from '../model/htsessiondata';
import HT_SessionStorage from '../storage/ht_session.storage.service';
import HT_LocalStorage from '../storage/ht_local.storage.service';
import HaventecCommon from '@haventec/common-web-sdk/';
import { HT_Error, ErrorCode, ErrorMessage } from '../model/error';
import { ISessionUpdateRequestObject } from '../model/session.update.request.object';

export class HT_DataService {

    private username: string;
    private username_key: string = 'haventec_username';
    private session_key: string;
    private local_key: string;

    constructor(username: string) {
        username = username.toLowerCase();
        this.setUsername(username);
        let data = this.getData(username);
        if (!data.saltBits) {
            data.saltBits = HaventecCommon.generateSalt().toString();
            this.setData(data);
        }
    }

    private setSessionData(sessionData: HT_Session_Data): void {
        HT_SessionStorage.setItem(this.session_key, sessionData);
    }

    private removeData(username: string): void {
        HT_LocalStorage.removeItem(this.local_key);
    }

    private getSessionData(): HT_Session_Data {
        let userSessionData = HT_SessionStorage.getItem(this.session_key)
        if (!userSessionData) {
            userSessionData = new HT_Session_Data(undefined, undefined);
        }
        HT_SessionStorage.setItem(this.session_key, userSessionData);
        return userSessionData;
    }

    private removeSessionData(): void {
        HT_SessionStorage.removeItem(this.session_key);
    }

    private getData(username: string): HT_Data {
        let userLocalData: HT_Data = <HT_Data>HT_LocalStorage.getItem(this.local_key);
        if (userLocalData) return userLocalData;
        userLocalData = new HT_Data(username, undefined, undefined, undefined, undefined);
        HT_LocalStorage.setItem(this.local_key, userLocalData);
        return userLocalData;
    }


    private setData(localData: HT_Data): void {
        HT_LocalStorage.setItem(this.local_key, localData);
    }

    private setUsername(username: string): void {
        this.username = username;
        this.session_key = 'ht_' + username + '_sessiondata';
        this.local_key = 'ht_' + username + '_localdata';
        HT_LocalStorage.setItem(this.username_key, username);
    }

    public getUsername(): string {
        return this.username;
    }

    public removeUsername(): void {
        HT_LocalStorage.removeItem(this.username_key);
    }

    public getAccessToken(): string {
        return this.getSessionData().accessToken;
    }

    public getDeviceUuid(): string {
        return this.getData(this.getUsername()).deviceUuid;
    }

    public getUserUuid(): string {
        let sessionData = this.getSessionData();
        try {
            let tokenData = HT_TokenService.parseJwt(sessionData.accessToken);
            return tokenData['userUUID'];
        } catch (e) {
            throw new HT_Error(ErrorCode.HT_AN_PARAM_ERROR, ErrorMessage.PARSING_ERROR);
        }
    }

    public getApplicationUuid(): string {
        let sessionData = this.getSessionData();
        try {
            let tokenData = HT_TokenService.parseJwt(sessionData.accessToken);
            if (tokenData['applicationUUID']) return tokenData['applicationUUID'];
        } catch (e) {
            throw new HT_Error(ErrorCode.HT_AN_PARAM_ERROR, ErrorMessage.PARSING_ERROR);
        }
    }

    public getAuthKey(): string {
        return this.getData(this.getUsername()).authKey;
    }

    public updateSessionStorage(requestObject: ISessionUpdateRequestObject): void {
        let localData = this.getData(this.getUsername());
        if (requestObject.authKey) localData.authKey = requestObject.authKey;
        if (requestObject.deviceUuid) localData.deviceUuid = requestObject.deviceUuid;
        localData.dataTime = new Date();
        this.setData(localData);

        let sessionData = this.getSessionData();
        if (requestObject.accessToken) {
            sessionData.accessToken = requestObject.accessToken.token;
            sessionData.accessTokenType = requestObject.accessToken.type;
        }
        this.setSessionData(sessionData);
    }

    public invalidateToken(): void {
        this.removeSessionData()
    }

    public purgeUser(): void {
        this.removeData(this.username);
        this.removeData(this.username_key);
    }

    public getHashedPin(pin: string, salt: Array<number>[128]): string {
        return HaventecCommon.hashPin(pin, salt);
    }

    public getDeviceInfo(): Object {
        return HaventecCommon.getDeviceInfo();
    }
}
