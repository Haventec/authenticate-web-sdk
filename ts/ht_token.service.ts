import * as atob from "atob";

export class HT_TokenService {

    public static parseJwt (jwtToken: any): any {

        if ( !jwtToken ) {
            return null;
        }

        const base64Url = jwtToken.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        const token = JSON.parse(atob(base64));
        return token;
    };
}
