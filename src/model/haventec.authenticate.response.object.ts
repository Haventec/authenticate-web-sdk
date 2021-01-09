export interface IHaventecAuthenticateResponseObject {
    accessToken: IToken;
    authKey: string;
    deviceUuid: string;
    webAuthnSupported: boolean;
    stepUpToken: string;
}

interface IToken {
    token: string;
    type: string;
}
