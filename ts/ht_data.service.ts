import {HT_Data} from './model/htdata';
import {HT_StorageService} from './storage/ht_storage.service';
import {HT_SessionService} from './storage/ht_session.service';
import {HT_CryptoService} from "./ht_crypto.service";
import {HT_IStorageService} from "./storage/ht_storage.service.interface";
import {HT_TokenService} from "./ht_token.service";
import {HT_Session_Data} from './model/htsessiondata';

export class HT_DataService {

    private _localDataMap: { [id: string]: HT_Data; };
    private _sessionDataMap: { [id: string]: HT_Session_Data; };

    private _storageService: HT_IStorageService;
    private _sessionService: HT_IStorageService;


    constructor(
        test?: boolean
    ) {
        this._storageService = new HT_StorageService(test);
        this._sessionService = new HT_SessionService(test);
    }

    public init(username: string): void {
        if ( username ) {
            this.setUsername(username);
            let data = this.getData(username);
            if ( !data.saltBits ) {
                this.resetSaltBits();
            }
        }
    }

    /**
     * Normalise _storageService to lower case.
     */
    public normaliseStorageService() {
        this._storageService.normaliseKeysToLowerCase();
    }

    public setStorageService(storageService: HT_IStorageService) {
        this._storageService = storageService;
    }

    public setSessionData(sessionData: HT_Session_Data) {
        //gets the username from local storage
        let username = this.getUsername();

        if ( !this._sessionDataMap ) {
            this._sessionDataMap = {};
        }

        if ( username ) {
            //maps the session data
            this._sessionDataMap[username.toLowerCase()] = sessionData;
            this._sessionService.setItem('ht_' + username.toLowerCase()+ '_sessiondata', JSON.stringify(sessionData));
        }
    }

    public setData(username: string, localData: HT_Data) {

        if ( username ) {
            if ( !this._localDataMap ) {
                this._localDataMap = {};
            }
            this._localDataMap[username.toLowerCase()] = localData;
            // The username introduced by the user
            this.setUsername(username);
            this._storageService.setItem('ht_' + username.toLowerCase() + '_localdata', JSON.stringify(localData));
        }
    }

    public removeData(username: string) {

        if ( username ) {
            if ( this._localDataMap && this._localDataMap[username.toLowerCase()]) {
                delete this._localDataMap[username.toLowerCase()];
            }

            // Remove the one from the previous version and the new with the name in lower case.
            this._storageService.removeItem('ht_' + username.toLowerCase() + '_localdata');
        }
    }

    /**
     * It could get the user/device data from the _localDataMap or _storageService. It will try first _localDataMap.
     *
     * @param username
     * @returns {HT_Data}
     */

    public getSessionData(): HT_Session_Data {
        let username = this.getUsername()
        if ( !username ){
            throw new Error('Username parameter is null at method getSessionData: ');
        }

        if( !this._sessionDataMap ) {
            this._sessionDataMap = {};
        }

        let userSessionData = this._sessionDataMap[username.toLowerCase()];
        if ( !userSessionData ) {
            let data = this._sessionService.getItem('ht_' + username.toLowerCase() + '_sessiondata');

            if ( data ) {
                userSessionData = JSON.parse(data);
                this._sessionDataMap[username.toLowerCase()] = userSessionData;
            } else {
                userSessionData = new HT_Session_Data(null, null);
            }
        }

        return userSessionData;

    }

    public removeSessionData() {
        let username = this.getUsername();
        if ( this._sessionDataMap && this._sessionDataMap[username.toLowerCase()]) {
            delete this._sessionDataMap[username.toLowerCase()];
        }

        // Remove the one from the previous version and the new with the name in lower case.
        this._sessionService.removeItem('ht_' + username.toLowerCase() + '_sessiondata');
    }

    /**
     * It could get the user/device data from the _localDataMap or _storageService. It will try first _localDataMap.
     *
     * @param username
     * @returns {HT_Data}
     */
    public getData(username: string, skipCache?: boolean): HT_Data {
        if( !username ) {
            throw new Error('Username parameter is null at method getData: ');
        }

        if ( !this._localDataMap ) {
            this._localDataMap = {};
        }

        // The new standard is the username in lower letter (e.g: ht_peter_localdata)
        let userLocalData = this._localDataMap[username.toLowerCase()];
        if ( !userLocalData || skipCache ) {
            // Try to get it from the Storage Service
            let data = this._storageService.getItem('ht_' + username.toLowerCase() + '_localdata');

            if ( data ) {
                // It was at the Storage service, so we bring it to the localDataMap
                userLocalData = JSON.parse(data);
                this._localDataMap[username.toLowerCase()] = userLocalData
            } else {
                // It was not at the Storage service, so we create one blank
                userLocalData = new HT_Data(username, null, null, null, null, null,
                    null, null, null, null, null);
                this.setData(username, userLocalData);
            }
        }

        return userLocalData;
    }

    public getUsername() {
        return this._storageService.getItem('haventec_username');
    }
    public setUsername(username) {
        this._storageService.setItem('haventec_username', username);
    }
    public removeUsername(username) {
        this._storageService.removeItem('haventec_username');
    }

    public getSaltBits() {
        let username = this.getUsername();
        if ( username ) {
            return this.getData(username).saltBits;
        }

        return null;
    }
    public setSaltBits(username: string, saltBits: string) {
        let localData = this.getData(username);

        if ( localData ) {
            localData.saltBits = saltBits;
            this.setData(username, localData);
        }
    }
    public resetSaltBits() {
        let username = this.getUsername();

        if ( username ) {
            let localData = this.getData(username);

            if ( localData ) {
                localData.saltBits = JSON.stringify(HT_CryptoService.generateSalt());
                this.setData(username, localData);
            }
        }
    }

    public getAccessToken(): string {
        let username = this.getUsername();
        if ( username ) {
            return this.getSessionData().accessToken;
        } else {
            return null;
        }
    }

    public getDeviceUuid(): string {
        let username = this.getUsername();
        if ( username ) {
            return this.getData(username).deviceUuid;
        }

        return null;
    }

    public setDeviceUuid(deviceUuid: string): void {
        let username = this.getUsername();
        if ( username ) {
            let localData = this.getData(username);
            if ( localData ) {
                localData.deviceUuid = deviceUuid;
                this.setData(username, localData);
            }
        }
    }

    public getUserUuid(): string {

        let userUuid = undefined;
        let username = this.getUsername();

        if ( username ) {
            let sessionData = this.getSessionData();

            if ( sessionData ) {
                //gets the access token from the session stroage
                let tokenData = HT_TokenService.parseJwt(sessionData.accessToken);
                if ( tokenData ) {
                    userUuid = tokenData['userUUID'];
                }
            }
        }
        return userUuid;
    }

    public getApplicationUuid(): string {

        let applicationUuid = undefined;

        let username = this.getUsername();

        if ( username ) {
            let sessionData = this.getSessionData();
            if ( sessionData ) {
                let tokenData = HT_TokenService.parseJwt(sessionData.accessToken);
                if ( tokenData ) {
                    applicationUuid = tokenData['applicationUUID'];
                }
            }

            if ( !applicationUuid ) {
                applicationUuid = this.getData(username, true).applicationUuid;
            }
            if ( applicationUuid == null ) {
                this.setApplicationUuid(undefined);
                applicationUuid = this.getData(username).applicationUuid;
            }
        }

        return applicationUuid;
    }

    public setApplicationUuid(applicationUuid: string): void {
        let username = this.getUsername();
        if ( username ) {
            let localData = this.getData(username);

            if ( localData ) {
                localData.applicationUuid = applicationUuid;
                this.setData(username, localData);
            }
        }
    }

    public getAuthKey(): string {
        let username = this.getUsername();
        if ( username ) {
            // authKey must always be read from localStorage to avoid sync issue with the cache
            return this.getData(username, true).authKey;
        }

        return null;
    }

    public setAuthKey(authKey: string): void {
        let username = this.getUsername();
        if ( username ) {
            let localData = this.getData(username);
            if ( localData ) {
                localData.authKey = authKey;
                this.setData(username, localData);
            }
        }
    }
    public updateDataFromResponse(response: any): void {
        let username = this.getUsername();

        if ( username ) {

            let localData = this.getData(username, true);
            if ( localData ) {
                if ( response && response['authKey'] ) {
                    localData.authKey = response['authKey'];
                }

                if ( response && response['deviceUuid'] ) {
                    localData.deviceUuid = response['deviceUuid'];
                }

                if ( response && response['userUuid'] ) {
                    localData.userUuid = response['userUuid'];
                }

                if ( response && response['applicationUuid'] ) {
                    localData.applicationUuid = response['applicationUuid'];
                }

                localData.dataTime = new Date();
                this.setData(username, localData);
            }

            let sessionData = this.getSessionData();
            if ( sessionData ) {
                if ( response && response['accessToken'] ) {
                    //puts the access token response into session data
                    sessionData.accessToken = response['accessToken']['token'];
                    sessionData.accessTokenType = response['accessToken']['type'];
                }
                this.setSessionData(sessionData);
            }
        }
    }

    public invalidateToken(): void {
        this.removeSessionData()
    }

    public purge(): void {
        let username = this.getUsername();
        if ( username ) {
            this.purgeUser(username);
        }
    }

    public purgeUser(username: string): void {
        this.removeData(username);
        this.removeUsername(username);
    }

    public isAdmin(): boolean {
        let username = this.getUsername();
        if ( username ) {
            let sessionData = this.getSessionData();
            if ( sessionData ) {
                let tokenData = HT_TokenService.parseJwt(sessionData.accessToken);
                if ( tokenData ) {
                    let roles = tokenData['role'];
                    if ( roles && roles.length > 0 && roles.includes('HT_ADMIN') ) {
                        return true;
                    }
                }
            }
        }

        return false;
    }
}
