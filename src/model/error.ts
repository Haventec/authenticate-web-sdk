export enum ErrorCode {
    HT_AN_PARAM_ERROR,
    HT_AN_EXTERNAL,
    HT_AN_NOT_INITIALISED
}

export enum ErrorMessage {
    PARSING_ERROR = "Error while parsing the string",
    INVALID_OBJECT = "Invalid/undefined object passed",
    INSUFFICIENT_PARAMETERS = "Insufficient parameters passed",
    NOT_INITIALISED = "The SDK has not been initialised with a user"
}

export class HT_Error {
    constructor(
        public errorCode: ErrorCode,
        public message: ErrorMessage){
    }
}
