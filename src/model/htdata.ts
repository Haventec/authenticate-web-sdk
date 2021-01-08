
export class HT_Data {
    constructor(
        public username: string,
        public saltBits: string,
        public deviceUuid: string,
        public authKey: string,
        public dataTime: Date,
        public webAuthnSupported: boolean
    )
    {

    }
}
