import * as request from "superagent";

export class HT_HttpService {

    constructor() {
    }

    public get(url: string, access_token: string, customHeaders?: any) {

        let self: any = this;

        const headers = customHeaders ? customHeaders : {};
        headers['Authorization'] = 'Bearer ' + access_token;
        headers['Content-type'] = 'application/json';

        return new Promise((resolve, reject) => {
            request.get(url)
                .set(headers)
                .then((response) => {
                    if ( self.validateResponse(response.body) )  {
                        return resolve(response.body);
                    } else {
                        return reject(response.body);
                    }
                }, reject);
        });
    }

    public getNoAuth(url: string, customHeaders?: any) {

        let self: any = this;

        const headers = customHeaders ? customHeaders : {};
        headers['Content-type'] = 'application/json';

        return new Promise((resolve, reject) => {
            request.get(url)
                .set(headers)
                .then((response) => {
                    if ( self.validateResponse(response.body) )  {
                        return resolve(response.body);
                    } else {
                        return reject(response.body);
                    }
                }).catch(function(error) {
                    return reject(error);
                });
        });
    }

    public patch(url: string, data: any, access_token: string, customHeaders?: any) {

        let self: any = this;

        const headers = customHeaders ? customHeaders : {};
        headers['Authorization'] = 'Bearer ' + access_token;
        headers['Content-type'] = 'application/json';

        return new Promise((resolve, reject) => {
            request.patch(url)
                .set(headers)
                .send(data)
                .then((response) => {
                    if ( self.validateResponse(response.body) )  {
                        return resolve(response.body);
                    } else {
                        return reject(response.body);
                    }
                }, reject);
        });
    }


    public post(url: string, data: any, access_token: string, customHeaders?: any) {

        let self: any = this;

        const headers = customHeaders ? customHeaders : {};
        headers['Authorization'] = 'Bearer ' + access_token;
        headers['Content-type'] = 'application/json';

        return new Promise((resolve, reject) => {
            request.post(url)
                .set(headers)
                .send(data)
                .then((response) => {
                    if ( self.validateResponse(response.body) )  {
                        return resolve(response.body);
                    } else {
                        return reject(response.body);
                    }
                }, reject);
        });
    }

    public put(url: string, data: any, access_token: string, customHeaders?: any) {

        let self: any = this;

        const headers = customHeaders ? customHeaders : {};
        headers['Authorization'] = 'Bearer ' + access_token;
        headers['Content-type'] = 'application/json';

        return new Promise((resolve, reject) => {
            request.put(url)
                .set(headers)
                .send(data)
                .then((response) => {
                    if ( self.validateResponse(response.body) )  {
                        return resolve(response.body);
                    } else {
                        return reject(response.body);
                    }
                }, reject);
        });
    }

    public postNoAuth(url: string, data: any, customHeaders?: any) {

        let self: any = this;

        const headers = customHeaders ? customHeaders : {};
        headers['Content-type'] = 'application/json';

        return new Promise((resolve, reject) => {
            request.post(url)
                .set(headers)
                .send(data)
                .then((response) => {
                    if ( self.validateResponse(response.body) )  {
                        return resolve(response.body);
                    } else {
                        return reject(response.body);
                    }
                }).catch(function(error) {
                    return reject(error);
                });
        });
    }

    public delete(url: string, access_token: string, customHeaders?: any) {

        let self: any = this;

        const headers = customHeaders ? customHeaders : {};
        headers['Authorization'] = 'Bearer ' + access_token;
        headers['Content-type'] = 'application/json';

        return new Promise((resolve, reject) => {
            request.delete(url)
                .set(headers)
                .then((response) => {
                    if ( self.validateResponse(response.body) )  {
                        return resolve(response.body);
                    } else {
                        return reject(response.body);
                    }
                }, reject);
        });
    }

    public validateResponse(response: any): boolean {
            if ( response && response.responseStatus && response.responseStatus.status &&
                response.responseStatus.status.toString().toUpperCase() === "SUCCESS"
            ) {
                return true;
            } else {
                return false;
            }
    }

}
