
export class HT_Data {
    constructor(
        public username: string,
        public saltBits: Array<number>[128],
        public deviceUuid: string,
        public authKey: string,
        public dataTime: Date
    )
    {

    }
}
