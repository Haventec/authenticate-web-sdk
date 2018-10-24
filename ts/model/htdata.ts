
export class HT_Data {
    constructor(
        public username: string,
        public pinHash: string,
        public saltBits: string,
        public connectorName: string,
        public connectorUuid: string,
        public applicationUuid: string,
        public userUuid: string,
        public deviceUuid: string,
        public authKey: string,
        public publicKey: string,
        public dataTime: Date
    )
    {

    }
}
