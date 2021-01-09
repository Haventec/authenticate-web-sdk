export interface IHaventecAuthenticateResponseObject {
    accessToken: IToken;
    authKey: string;
    deviceUuid: string;
    webAuthnSupported: boolean;
}

interface IToken {
    token: string;
    type: string;
}
