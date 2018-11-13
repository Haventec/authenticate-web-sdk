import { HT_DataService } from "../ht_data.service";
import { HT_CryptoService } from "../ht_crypto.service";
import { HT_IStorageService } from "../storage/ht_storage.service.interface";
import { HT_HttpService } from "../ht_http.service";
import { HT_DeviceService } from "../ht_device.service";

export class HaventecAuthenticateClient {

    private currentUser: string;
    private domain: string;
    private applicationUuid: string;
    private dataService: HT_DataService;
    private deviceService: HT_DeviceService;
    public http: HT_HttpService;

    constructor(
        public test?: boolean
    ) {
        this.dataService = new HT_DataService(test);
        this.deviceService = new HT_DeviceService();
        this.http = new HT_HttpService();
        this.dataService.normaliseStorageService();
    }

    public init(applicationUuid: string, domain: string) {
        this.applicationUuid = applicationUuid;
        this.domain = domain;
    }

    public initialize(domain: string, applicationUuid?: string) {
        this.applicationUuid = applicationUuid;
        this.domain = domain;
    }

    public activateDevice(username: string, pin: string, activationToken: string, customHeaders?: any, urlOverwrite?:string) {
        let url = (urlOverwrite ? urlOverwrite : this.domain + '/activate/device');

        this.setCurrentUser(username);
        if ( this.applicationUuid ) {
            this.dataService.setApplicationUuid(this.applicationUuid);
        }

        let requestBody = {
            activationToken: activationToken,
            deviceUuid: this.dataService.getDeviceUuid(),
            hashedPin: HT_CryptoService.getBase64Hash512SaltedPin(pin, this.dataService.getSaltBits()),
            username: username
        };

        this.setApplicationUuidParameter(requestBody);

        return this.postNoAuth(url, requestBody, customHeaders);
    }

    public addDevice(username: string, deviceName?: string, customHeaders?: any, urlOverwrite?:string) {
        let url = (urlOverwrite ? urlOverwrite : this.domain + '/device');

        this.setCurrentUser(username);
        if ( this.applicationUuid ) {
            this.dataService.setApplicationUuid(this.applicationUuid);
        }

        if(!deviceName){
            deviceName = this.deviceService.getDeviceName();
        }

        let requestBody = {
            deviceName: deviceName,
            username: username
        };

        this.setApplicationUuidParameter(requestBody);

        return this.postNoAuth(url, requestBody, customHeaders);
    }

    public activateUser(username:string, activationToken:string, pin:string, customHeaders?: any, urlOverwrite?:string, deviceName?:string) {
        let url = (urlOverwrite ? urlOverwrite : this.domain + '/activate/user');

        this.setCurrentUser(username);
        if ( this.applicationUuid ) {
            this.dataService.setApplicationUuid(this.applicationUuid);
        }

        if(!deviceName){
            deviceName = this.deviceService.getDeviceName();
        }

        let requestBody = {
            activationToken: activationToken,
            deviceName: deviceName,
            hashedPin: HT_CryptoService.getBase64Hash512SaltedPin(pin, this.dataService.getSaltBits()),
            username: username
        };

        this.setApplicationUuidParameter(requestBody);

        return this.postNoAuth(url, requestBody, customHeaders);
    }

    public deleteDevice(deviceUuid: string, customHeaders?: any, urlOverwrite?:string) {
        let url = (urlOverwrite ? urlOverwrite : this.domain + '/device/' + deviceUuid);
        return this.delete(url, customHeaders);
    }

    public lockDevice(deviceUuid: string, customHeaders?: any, urlOverwrite?:string) {
        let requestBody = {
            "locked": true
        };

        let url = (urlOverwrite ? urlOverwrite : this.domain + '/device/' + deviceUuid);
        return this.patch(url, requestBody, customHeaders);
    }

    public unlockDevice(deviceUuid: string, customHeaders?: any, urlOverwrite?:string) {
        let requestBody = {
            "locked": false
        };

        let url = (urlOverwrite ? urlOverwrite : this.domain + '/device/' + deviceUuid);
        return this.patch(url, requestBody, customHeaders);
    }

    public forgotPin(username: string, customHeaders?: any, urlOverwrite?:string) {
        let url = (urlOverwrite ? urlOverwrite : this.domain + '/forgot-pin');

        this.setCurrentUser(username);
        if ( this.applicationUuid ) {
            this.dataService.setApplicationUuid(this.applicationUuid);
        }

        let requestBody = {
            deviceUuid: this.dataService.getDeviceUuid(),
            username: this.dataService.getUsername()
        };

        this.setApplicationUuidParameter(requestBody);

        return this.postNoAuth(url, requestBody, customHeaders);
    }

    public getCurrentUserDetails(customHeaders?: any, urlOverwrite?:string) {
        let url = (urlOverwrite ? urlOverwrite : this.domain + '/user/current');
        return this.http.get(url, this.getAccessToken(), customHeaders)
    }

    public getUserDevices(userUuid: string, customHeaders?: any, urlOverwrite?:string) {
        let url = (urlOverwrite ? urlOverwrite : this.domain + '/user/' + userUuid + '/device');
        return this.http.get(url, this.getAccessToken(), customHeaders)
    }

    public login(username: string, pin: string, customHeaders?: any, urlOverwrite?:string) {
        let url = (urlOverwrite ? urlOverwrite : this.domain + '/login');

        this.setCurrentUser(username);

        let requestBody = {
            authKey: this.dataService.getAuthKey(),
            deviceUuid: this.dataService.getDeviceUuid(),
            hashedPin: HT_CryptoService.getBase64Hash512SaltedPin(pin, this.dataService.getSaltBits()),
            username: username
        };

        this.setApplicationUuidParameter(requestBody);

        return this.postNoAuth(url, requestBody, customHeaders);
    }

    public logout(customHeaders?: any, urlOverwrite?:string) {
        let url = (urlOverwrite ? urlOverwrite : this.domain + '/logout');
        return new Promise((resolve, reject) => {
            this.delete(url, customHeaders).then(
                data => {
                    this.dataService.invalidateToken();
                    resolve(data);
                },
                err => {reject(err);}
            );
        });
    }

    public resetPin(username: string, resetPinToken: string, pin:string, customHeaders?: any, urlOverwrite?:string) {
        let url = (urlOverwrite ? urlOverwrite : this.domain + '/reset-pin');

        this.setCurrentUser(username);
        if ( this.applicationUuid ) {
            this.dataService.setApplicationUuid(this.applicationUuid);
        }

        let requestBody = {
            deviceUuid: this.dataService.getDeviceUuid(),
            hashedPin: HT_CryptoService.getBase64Hash512SaltedPin(pin, this.dataService.getSaltBits()),
            resetPinToken: resetPinToken,
            username: username
        };

        this.setApplicationUuidParameter(requestBody);

        return this.postNoAuth(url, requestBody, customHeaders);
    }

    public signUp(username: string, email: string, customHeaders?: any, urlOverwrite?:string, mobileNumber?: string) {
        let url = (urlOverwrite ? urlOverwrite : this.domain + '/self-service/user');

        this.setCurrentUser(username);
        if ( this.applicationUuid ) {
            this.dataService.setApplicationUuid(this.applicationUuid);
        }

        let requestBody = {
            email: email,
            username: username,
            mobileNumber: mobileNumber,
        };

        this.setApplicationUuidParameter(requestBody);

        return this.postNoAuth(url, requestBody, customHeaders);
    }

    public getHashPin(pin: string): string {
        return HT_CryptoService.getBase64Hash512SaltedPin(pin, this.dataService.getSaltBits());
    }

    public setStorageService(storageService: HT_IStorageService) {
        this.dataService.setStorageService(storageService);
        this.dataService.normaliseStorageService();
    }

    public getUsername() {
        return this.dataService.getUsername();
    }

    public getAccessToken(): string {
        return this.dataService.getAccessToken();
    }

    public getDeviceUuid(): string {
        return this.dataService.getDeviceUuid();
    }

    public getUserUuid(): string {
        return this.dataService.getUserUuid();
    }

    public getApplicationUuid(): string {
        return this.dataService.getApplicationUuid();
    }

    public getAuthKey(): string {
        return this.dataService.getAuthKey();
    }

    public updateDataFromResponse(response: any): void {
        this.dataService.updateDataFromResponse(response);
    }

    public invalidateToken(): void {
        this.dataService.invalidateToken();
    }

    public isAdmin(): boolean {
        return this.dataService.isAdmin();
    }

    public purge(): void {
        this.currentUser = undefined;
        this.dataService.purge();
    }

    public getDeviceName(): string {
        return this.deviceService.getDeviceName();
    }


    private setCurrentUser(username: string) {
        if(username && this.currentUser !== username){
            this.currentUser = username;
            this.dataService.init(username);
        }
    }


    private patch(url: string, data: any, customHeaders?: any) {
        return new Promise((resolve, reject) => {
            this.http.patch(url, data, this.getAccessToken(), customHeaders).then(
                data => {
                    this.dataService.updateDataFromResponse(data);
                    resolve(data);
                },
                err => {reject(err);}
            );
        });
    }

    private post(url: string, data: any, customHeaders?: any) {
        return new Promise((resolve, reject) => {
            this.http.post(url, data, this.getAccessToken(), customHeaders).then(
                data => {
                    this.dataService.updateDataFromResponse(data);
                    resolve(data);
                },
                err => {reject(err);}
            );
        });
    }

    private postNoAuth(url: string, data: any, customHeaders?: any) {
        return new Promise((resolve, reject) => {
            this.http.postNoAuth(url, data, customHeaders).then(
                data => {
                    this.dataService.updateDataFromResponse(data);
                    resolve(data);
                },
                err => {reject(err);}
            );
        });
    }

    private delete(url: string, customHeaders?: any) {
        return new Promise((resolve, reject) => {
            this.http.delete(url, this.getAccessToken(), customHeaders).then(
                data => {
                    this.dataService.updateDataFromResponse(data);
                    resolve(data);
                },
                err => {reject(err);}
            );
        });
    }

    private setApplicationUuidParameter(data: any) {
        if ( this.dataService.getApplicationUuid() && data ) {
            data['applicationUuid'] = this.dataService.getApplicationUuid();
        }
    }
}
