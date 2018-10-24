import {expect, tap} from "tapbundle";
import {HT_HttpService} from "../ts/index";

import * as request from "superagent";
import * as mockRequest from "superagent-mock";

var mockConfig = [
    {
        pattern: 'http://mytest.com(.*)',
        fixtures: function (match, params, headers) {

            if (match[1] === '/testendpoint') {
                return ({body: {responseStatus: {status: "SUCCESS"}}});
            }

            if (match[1] === '/testendpointbad') {
                return ({body: {responseStatus: {status: "ERROR"}}});
            }

            return 'foo';
        },
        get: function (match, data) {
            return data
        },
        delete: function (match, data) {
            return data
        },
        post: function (match, data) {
            return data;
        },
        put: function (match, data) {
            return data;
        }
    }
];

var logger = function(log)  {
    // console.log('superagent call', log);
};

tap.test("it should call getNoAuth and verify the return", async () => {

    var superagentMock = mockRequest(request, mockConfig, logger);

    let hs = new HT_HttpService();
    let myValue = await hs.getNoAuth("http://mytest.com/testendpoint");

    expect(myValue['responseStatus']['status']).to.be.equal("SUCCESS");

    superagentMock.unset();
});

tap.test("it should call get and verify the return", async () => {

    var superagentMock = mockRequest(request, mockConfig, logger);

    let hs = new HT_HttpService();
    let myValue = await hs.get("http://mytest.com/testendpoint", 'my_access_token');

    expect(myValue['responseStatus']['status']).to.be.equal("SUCCESS");

    superagentMock.unset();
});

tap.test("it should call delete and verify the return", async () => {

    var superagentMock = mockRequest(request, mockConfig, logger);

    let hs = new HT_HttpService();
    let myValue = await hs.delete("http://mytest.com/testendpoint", 'my_access_token');

    expect(myValue['responseStatus']['status']).to.be.equal("SUCCESS");

    superagentMock.unset();
});

tap.test("it should call postNoAuth and verify the return", async () => {

    var superagentMock = mockRequest(request, mockConfig, logger);

    let hs = new HT_HttpService();

    let data = {
        username: 'testuser',
        pin: '1234'
    };

    let myValue = await hs.postNoAuth("http://mytest.com/testendpoint", data);

    expect(myValue['responseStatus']['status']).to.be.equal("SUCCESS");

    superagentMock.unset();
});

tap.test("it should call post and verify the return", async () => {

    var superagentMock = mockRequest(request, mockConfig, logger);

    let hs = new HT_HttpService();

    let data = {
        username: 'testuser',
        pin: '1234'
    };

    let myValue = await hs.post("http://mytest.com/testendpoint", data, 'my_access_token');

    expect(myValue['responseStatus']['status']).to.be.equal("SUCCESS");

    superagentMock.unset();
});

tap.test("it should call put and verify the return", async () => {

    var superagentMock = mockRequest(request, mockConfig, logger);

    let hs = new HT_HttpService();

    let data = {
        username: 'testuser',
        pin: '1234'
    };

    let myValue = await hs.put("http://mytest.com/testendpoint", data, 'my_access_token');

    expect(myValue['responseStatus']['status']).to.be.equal("SUCCESS");

    superagentMock.unset();
});

tap.test("it should call getNoAuth with a bad endpoint and verify the return", async () => {

    var superagentMock = mockRequest(request, mockConfig, logger);

    let did_error = false;
    let hs = new HT_HttpService();
    try {
        await hs.getNoAuth("http://mytest.com/testendpointbad");
    } catch ( error ) {
        expect(error['responseStatus']['status']).to.be.equal("ERROR");
        did_error = true;
    }

    expect(did_error).to.be.true;

    superagentMock.unset();
});

tap.test("it should call get with a bad endpoint and verify the return", async () => {

    var superagentMock = mockRequest(request, mockConfig, logger);

    let did_error = false;
    let hs = new HT_HttpService();

    try {
        await hs.get("http://mytest.com/testendpointbad", 'my_access_token');
    } catch ( error ) {
        expect(error['responseStatus']['status']).to.be.equal("ERROR");
        did_error = true;
    }

    expect(did_error).to.be.true;

    superagentMock.unset();
});

tap.test("it should call delete with a bad endpoint and verify the return", async () => {

    var superagentMock = mockRequest(request, mockConfig, logger);

    let did_error = false;
    let hs = new HT_HttpService();

    try {
        await hs.delete("http://mytest.com/testendpointbad", 'my_access_token');
    } catch ( error ) {
        expect(error['responseStatus']['status']).to.be.equal("ERROR");
        did_error = true;
    }

    expect(did_error).to.be.true;

    superagentMock.unset();
});

tap.test("it should call postNoAuth with a bad endpoint and verify the return", async () => {

    var superagentMock = mockRequest(request, mockConfig, logger);

    let did_error = false;
    let hs = new HT_HttpService();

    let data = {
        username: 'testuser',
        pin: '1234'
    };

    try {
        await hs.postNoAuth("http://mytest.com/testendpointbad", data);
    } catch ( error ) {
        expect(error['responseStatus']['status']).to.be.equal("ERROR");
        did_error = true;
    }

    expect(did_error).to.be.true;

    superagentMock.unset();
});

tap.test("it should call post with a bad endpoint and verify the return", async () => {

    var superagentMock = mockRequest(request, mockConfig, logger);

    let did_error = false;
    let hs = new HT_HttpService();

    let data = {
        username: 'testuser',
        pin: '1234'
    };

    try {
        await hs.post("http://mytest.com/testendpointbad", data, 'my_access_token');
    } catch ( error ) {
        expect(error['responseStatus']['status']).to.be.equal("ERROR");
        did_error = true;
    }

    expect(did_error).to.be.true;

    superagentMock.unset();
});

tap.test("it should call put with a bad endpoint and verify the return", async () => {

    var superagentMock = mockRequest(request, mockConfig, logger);

    let did_error = false;
    let hs = new HT_HttpService();

    let data = {
        username: 'testuser',
        pin: '1234'
    };

    try {
        await hs.put("http://mytest.com/testendpointbad", data, 'my_access_token');
    } catch ( error ) {
        expect(error['responseStatus']['status']).to.be.equal("ERROR");
        did_error = true;
    }

    expect(did_error).to.be.true;

    superagentMock.unset();
});


tap.start()