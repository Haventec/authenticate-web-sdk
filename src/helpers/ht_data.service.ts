import { HT_Data } from '../model/htdata';
import { HT_TokenService } from "./ht_token.service";
import { HT_Session_Data } from '../model/htsessiondata';
import HT_SessionStorage from '../storage/ht_session.storage.service';
import HT_LocalStorage from '../storage/ht_local.storage.service';
import HaventecCommon from '@haventec/common-web-sdk/';
import { HT_Error, ErrorCode, ErrorMessage } from '../model/error';
import { IHaventecAuthenticateResponseObject } from '../model/haventec.authenticate.response.object';

export class HT_DataService {

    private username: string;
    private username_key: string = 'haventec_username';
    private session_key: string;
    private local_key: string;

    constructor(username?: string) {

        if ( !username ) {
            const haventec_username = localStorage.getItem('haventec_username');
            if ( haventec_username ) {
                username = haventec_username.toString();
            }
        }

        if ( username ) {
            username = username.toLowerCase().replace(/\"/g, '');

            this.setUsername(username);
            let data = this.getData();
            if (!data.saltBits) {
                data.saltBits = JSON.stringify(HaventecCommon.generateSalt());
                this.setData(data);
            }
        }
    }

    private getSessionData(): HT_Session_Data {
        let userSessionData = HT_SessionStorage.getItem(this.session_key);
        if (!userSessionData) {
            userSessionData = new HT_Session_Data(undefined, undefined);
            this.setSessionData(userSessionData);
        }
        return userSessionData;
    }

    private setSessionData(sessionData: HT_Session_Data): void {
        HT_SessionStorage.setItem(this.session_key, sessionData);
    }

    private removeSessionData(): void {
        HT_SessionStorage.removeItem(this.session_key);
    }

    private getData(): HT_Data {
        let userLocalData: HT_Data = <HT_Data>HT_LocalStorage.getItem(this.local_key);
        if (userLocalData) return userLocalData;
        userLocalData = new HT_Data(this.getUsername(), undefined, undefined, undefined, undefined);
        this.setData(userLocalData);
        return userLocalData;
    }

    private setData(localData: HT_Data): void {
        HT_LocalStorage.setItem(this.local_key, localData);
    }

    private removeData(): void {
        HT_LocalStorage.removeItem(this.local_key);
    }

    public getUsername(): string {
        return this.username;
    }

    public getActiveUsernames(): string[] {
        const usernamePattern = /^ht_.+_localdata/;
        let items = HT_LocalStorage.getAllItems();
        return Object.keys(items).filter(key =>
            usernamePattern.test(key)
            && (<HT_Data>HT_LocalStorage.getItem(key)).deviceUuid)
            .map(key => (<HT_Data>HT_LocalStorage.getItem(key)).username);
    }

    private setUsername(username): void {
        username = username.replace(/(^\")|("$)/gi, "");
        this.username = username;
        this.session_key = 'ht_' + this.username + '_sessiondata';
        this.local_key = 'ht_' + this.username + '_localdata';
        localStorage.setItem(this.username_key, username);
    }

    public removeUsername(): void {
        HT_LocalStorage.removeItem(this.username_key);
    }

    public getAccessToken(): string {
        return this.getSessionData().accessToken;
    }

    public getDeviceUuid(): string {
        return this.getData().deviceUuid;
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
        return this.getData().authKey;
    }

    public updateStorage(requestObject: IHaventecAuthenticateResponseObject): void {
        // Update Local Storage if required
        if (requestObject.authKey || requestObject.deviceUuid) {
            let localData = this.getData();
            if (requestObject.authKey) localData.authKey = requestObject.authKey;
            if (requestObject.deviceUuid) localData.deviceUuid = requestObject.deviceUuid;
            localData.dataTime = new Date();
            this.setData(localData);
        }

        // Update Session Storage if required
        if (requestObject.accessToken) {
            let sessionData = this.getSessionData();
            sessionData.accessToken = requestObject.accessToken.token;
            sessionData.accessTokenType = requestObject.accessToken.type;
            this.setSessionData(sessionData);
        }
    }

    public invalidateToken(): void {
        this.removeSessionData();
    }

    public purgeUser(): void {
        this.invalidateToken();
        this.removeData();
        this.removeUsername();
    }

    public getHashedPin(pin: string): string {
        let salt: Array<number>[128] = (<any>this.getData().saltBits).length == 128 ? this.getData().saltBits : JSON.parse(this.getData().saltBits.toString());
        return HaventecCommon.hashPin(pin, salt);
    }

    public getDeviceInfo(detailedFingerprint = false): Object {
        return HaventecCommon.getDeviceInfo(detailedFingerprint);
    }
}
