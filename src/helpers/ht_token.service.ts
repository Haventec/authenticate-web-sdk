import * as atob from "atob";
import { ErrorCode, ErrorMessage, HT_Error } from "../model/error";

export class HT_TokenService {

    public static parseJwt (jwtToken: string): Object {
        if ( !jwtToken ) return undefined;
        try{
            const base64Url = jwtToken.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            const token = JSON.parse(atob(base64));
            return token;
        } catch (error) {
            throw new HT_Error(ErrorCode.HT_AN_PARAM_ERROR, ErrorMessage.PARSING_ERROR);
        }    
    };
}
