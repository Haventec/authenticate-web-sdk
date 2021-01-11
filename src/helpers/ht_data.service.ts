import { HT_Data } from '../model/htdata';
import { HT_TokenService } from "./ht_token.service";
import { HT_Session_Data } from '../model/htsessiondata';
import HT_SessionStorage from '../storage/ht_session.storage.service';
import HT_LocalStorage from '../storage/ht_local.storage.service';
import HaventecCommon from '@haventec/common-web-sdk/';
import { HT_Error, ErrorCode, ErrorMessage } from '../model/error';
import { IHaventecAuthenticateResponseObject } from '../model/haventec.authenticate.response.object';

export class HT_DataService {

    private _username: string;
    private username_key: string = 'haventec_username';
    private session_key: string;
    private local_key: string;

    constructor(username?: string, newSalt?: boolean) {

        let localUsername = username;

        if ( !localUsername ) {
            const haventec_username = localStorage.getItem(this.username_key);
            if ( haventec_username ) {
                localUsername = haventec_username.toString();
            }
        }

        if ( localUsername ) {
            localUsername = localUsername.toLowerCase().replace(/\"/g, '');

            this.setUsername(localUsername);
            let data: HT_Data = this.getData();
            if (!data.saltBits || newSalt) {
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
        let username = this.getUsername();
        if(!username){
            throw new HT_Error(ErrorCode.HT_AN_NOT_INITIALISED, ErrorMessage.INVALID_OBJECT);
        }
        let userLocalData: HT_Data = <HT_Data>HT_LocalStorage.getItem(this.local_key);
        if (userLocalData) return userLocalData;
        userLocalData = new HT_Data(this.getUsername(), undefined, undefined, undefined, undefined, undefined);
        this.setData(userLocalData);
        return userLocalData;
    }

    private setData(localData: HT_Data): void {
        HT_LocalStorage.setItem(this.local_key, localData);
    }

    private removeData(): void {
        if (!this.getData()) {
            throw new HT_Error(ErrorCode.HT_AN_NOT_INITIALISED, ErrorMessage.NOT_INITIALISED);
        }

        HT_LocalStorage.removeItem(this.local_key);
    }

    public getUsername(): string {
        return this._username;
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
        this._username = username;
        this.session_key = 'ht_' + username + '_sessiondata';
        this.local_key = 'ht_' + username + '_localdata';
        localStorage.setItem(this.username_key, username);
    }

    public removeUsername(): void {
        if (!this.getData()) {
            throw new HT_Error(ErrorCode.HT_AN_NOT_INITIALISED, ErrorMessage.NOT_INITIALISED);
        }

        HT_LocalStorage.removeItem(this.username_key);
    }

    public getAccessToken(): string {
        return this.getSessionData().accessToken;
    }

    public getDeviceUuid(): string {
        if (!this.getData()) {
            throw new HT_Error(ErrorCode.HT_AN_NOT_INITIALISED, ErrorMessage.NOT_INITIALISED);
        }

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

    public getSalt(): string {
        return this.getData().saltBits;
    }
    public setSalt(salt: string) {
        let data: HT_Data = this.getData();

        if (!data) {
            throw new HT_Error(ErrorCode.HT_AN_NOT_INITIALISED, ErrorMessage.NOT_INITIALISED);
        }

        data.saltBits = salt;
        this.setData(data);
    }

    public regenerateSalt() {
        let data: HT_Data = this.getData();

        if (!data) {
            throw new HT_Error(ErrorCode.HT_AN_NOT_INITIALISED, ErrorMessage.NOT_INITIALISED);
        }

        data.saltBits = JSON.stringify(HaventecCommon.generateSalt());
        this.setData(data);
    }

    public getWebAuthnSupported(): boolean {
        if (!this.getData()) {
            throw new HT_Error(ErrorCode.HT_AN_NOT_INITIALISED, ErrorMessage.NOT_INITIALISED);
        }

        return this.getData().webAuthnSupported;
    }

    public updateStorage(requestObject: IHaventecAuthenticateResponseObject): void {

        if (!this.getData()) {
            throw new HT_Error(ErrorCode.HT_AN_NOT_INITIALISED, ErrorMessage.NOT_INITIALISED);
        }

        // Update Local Storage if required
        if (requestObject.authKey || requestObject.deviceUuid || requestObject.webAuthnSupported !== undefined) {
            let localData = this.getData();
            if (requestObject.authKey) localData.authKey = requestObject.authKey;
            if (requestObject.deviceUuid) localData.deviceUuid = requestObject.deviceUuid;
            if (requestObject.webAuthnSupported !== undefined) localData.webAuthnSupported = requestObject.webAuthnSupported;
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
        if (!this.getData()) {
            throw new HT_Error(ErrorCode.HT_AN_NOT_INITIALISED, ErrorMessage.NOT_INITIALISED);
        }

        this.invalidateToken();
        this.removeData();
        this.removeUsername();
    }

    public getHashedPin(pin: string): string {

        if (!this.getData() || !this.getData().saltBits) {
            throw new HT_Error(ErrorCode.HT_AN_NOT_INITIALISED, ErrorMessage.NOT_INITIALISED);
        }

        let salt: Array<number>[128] = (<any>this.getData().saltBits).length == 128 ? this.getData().saltBits : JSON.parse(this.getData().saltBits.toString());
        return HaventecCommon.hashPin(pin, salt);
    }

    public getDeviceInfo(detailedFingerprint = false): Object {
        return HaventecCommon.getDeviceInfo(detailedFingerprint);
    }

    public getValueFromKey(obj: any, key: string): string {

        for ( let i=0; obj && i<obj.length; i++ ) {
            if ( obj[i]['key'] === key ) {
                return obj[i]['value'];
            }
        }
        return '';
    }
}
