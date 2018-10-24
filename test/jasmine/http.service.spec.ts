
import {HttpService} from "../../ts/ht_http.service";
import * as request from "superagent";
import * as mockRequest from "superagent-mock";

var logger = function(log)  {
    console.log('superagent call', log);
};

var mockConfig = [
    {
        pattern: 'http://mytest.com(.*)',
        fixtures: function (match, params, headers) {

            if (match[1] === '/testendpoint') {
                return ({body: {status: "SUCCESS"}});
            }

            return 'foo';
        },
        get: function (match, data) {
            return data
        }
    }
];

describe('subtract method', () => {

    it('dumb test', () => {
       console.log('ran test');
       expect(true).toBeTruthy();
    });

    it('subtracts 2 numbers', () => {

        // Before tests
        var superagentMock = mockRequest(request, mockConfig, logger);

        let ha = new HttpService();

        ha.get("http://mytest.com/testendpoint").then(function(response) {
           console.log("yay!");
           expect(response['status']).toBe("SUCCESS");
        });

        superagentMock.unset();
    });

});

