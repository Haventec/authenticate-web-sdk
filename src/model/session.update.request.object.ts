export interface ISessionUpdateRequestObject {
    accessToken: IToken;
    authKey: string;
    deviceUuid: string;
}

interface IToken {
    token: string;
    type: string;
}