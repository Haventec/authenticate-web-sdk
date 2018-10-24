import * as request from "superagent";

export class HT_HttpService {

    constructor() {
    }

    public get(url: string, access_token: string) {

        let self: any = this;

        return new Promise((resolve, reject) => {
            request.get(url)
                .set("Authorization", "Bearer " + access_token)
                .set("Content-type", "application/json")
                .then((response) => {
                    if ( self.validateResponse(response.body) )  {
                        return resolve(response.body);
                    } else {
                        return reject(response.body);
                    }
                }, reject);
        });
    }

    public getNoAuth(url: string) {

        let self: any = this;

        return new Promise((resolve, reject) => {
            request.get(url)
                .set("Content-type", "application/json")
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

    public patch(url: string, data: any, access_token: string) {

        let self: any = this;

        return new Promise((resolve, reject) => {
            request.patch(url)
                .set("Authorization", "Bearer " + access_token)
                .set("Content-type", "application/json")
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


    public post(url: string, data: any, access_token: string) {

        let self: any = this;

        return new Promise((resolve, reject) => {
            request.post(url)
                .set("Authorization", "Bearer " + access_token)
                .set("Content-type", "application/json")
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

    public put(url: string, data: any, access_token: string) {

        let self: any = this;

        return new Promise((resolve, reject) => {
            request.put(url)
                .set("Authorization", "Bearer " + access_token)
                .set("Content-type", "application/json")
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

    public postNoAuth(url: string, data: any) {

        let self: any = this;

        return new Promise((resolve, reject) => {
            request.post(url)
                .set("Content-type", "application/json")
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

    public delete(url: string, access_token: string) {

        let self: any = this;

        return new Promise((resolve, reject) => {
            request.delete(url)
                .set("Authorization", "Bearer " + access_token)
                .set("Content-type", "application/json")
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
