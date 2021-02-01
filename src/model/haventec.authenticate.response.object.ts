export interface IHaventecAuthenticateResponseObject {
    accessToken: IToken;
    authKey: string;
    deviceUuid: string;
    webAuthnSupported: boolean;
    webAuthnDeviceUuid: string;
}

interface IToken {
    token: string;
    type: string;
}
